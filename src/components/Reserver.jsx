import React, { useEffect, useState } from 'react'
import Icon from "./Icon"
import ActivityIndicator from "./ActivityIndicator";
import { auth, db } from '../firebase_file';
import firebase from "firebase"

export default function Reserver({close,hotel,chambre}) {
    const [nb_nuit,set_nb_nuit]=useState(1)
    const [arrivee,set_arrivee]=useState("")
    const [total,set_total]=useState(0)
    const [nom,set_nom]=useState("")
    const [telephone,set_telephone]=useState("")
    const [email,set_email]=useState("")
    const [sending,set_sending]=useState(false)
    const [done,set_done]=useState(false)
    const [connected,set_connected]=useState(false)
    const [moyen_payement,set_moyen_payement]=useState(0);

    useEffect(()=>{
        auth.onAuthStateChanged((user)=>{
            if(user==null){
                set_connected(false)
            }else{
                set_connected(true)
            }
        })
    },[])

    useEffect(()=>{
        const m_email=auth?.currentUser?.email;
        load_client(m_email)
    },[auth])

    const load_client=async (m_email)=>{
        const snap=await db.collection("clients").where("email","==",m_email).get()
        if(snap.docs.length==0){
            return;
        }
        let doc=snap.docs[0]
        let id=doc.id;
        let dt=doc.data()
        set_email(dt.email)
        set_nom(dt?.username)
        set_telephone(dt?.telephone)

    }

    useEffect(()=>{
        if(chambre==null) return;
        let prix=parseFloat(chambre?.prix_par_nuit);
        if(connected==true){
            let remise=prix*0.2
            remise=remise.toFixed(2)
            prix=prix-remise
        }
        
        let t=prix*nb_nuit;
        set_total(t)
    },[nb_nuit,connected])


    const remove_nb_nuit=()=>{
        let n=nb_nuit-1;
        if(n<=0){
            n=1;
        }
        set_nb_nuit(n)
    }
    const add_nb_nuit=()=>{
        let n=nb_nuit+1;
        set_nb_nuit(n)
    }

    const confirmer=async ()=>{
        if(arrivee==""){
            alert("Vous devez définir votre date d'arrivé dans l'hôtel");
            return;
        }
        if(nom==""){
            alert("Remplissez votre nom");
            return;
        }
        if(telephone==""){
            alert("Vous devez saisir votre numéro de téléphone");
            return;
        }
        if(email==""){
            alert("Vous devez renseigner votre addresse email");
            return;
        }

        if(moyen_payement==0){
            alert("Vous devez choisir un moyen de paiement");
            return;
        }



        set_sending(true)
        let line={
            ...chambre,
            total,
            nb_nuit,
            arrivee,
            nom_contact:nom,
            telephone_contact:telephone,
            email_contact:email,
            hotel,
            date:firebase.firestore.FieldValue.serverTimestamp(),
        }
        await db.collection("reservations").add(line);

        let api_key="7614c0e3-1973-4e96-9e52-4d950e39d984"
        let url=`https://paygateglobal.com/v1/page?token=${api_key}&amount=${total*655}&description=${hotel?.nom}&identifier=${Math.random()}&url=https://kof-gesthotel.web.app&phone=${telephone}&network=${moyen_payement==1 ? 'TOGOCEL':'MOOV'}`;

        window.location.href=url;

        /*let url="https://paygateglobal.com/api/v1/pay"
       const res= await fetch(url,{
            method:"POST",
            mode:"no-cors",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body:JSON.stringify({
                auth_token:"7614c0e3-1973-4e96-9e52-4d950e39d984",
                phone_number:telephone,
                amount:total*655,
                description:chambre?.nom,
                identifier:Math.random(),
                network:moyen_payement==1 ? 'TMONEY':'FLOOZ'
            })
        })

        const response=await res.text()
        console.log("response",response)*/

        set_sending(false)
        //set_done(true)
    }

    if(done==true){
        return(
            <div className='w-[500px]'>
                <div className='bg-slate-900 p-2 text-white'>
                    <strong>Finalisation de la réservation</strong>
                </div>
                <div className='m-2'>
                    <h1 className='font-bold text-slate-900'>Félicitation !!!</h1>
                    <p className='text-slate-900 mt-2'>Votre réservation est bien enregistrée, nous vous contacterons par téléphone ou par mail très bientôt.</p>
                    <button className='mt-2 bg-slate-900 text-white p-2 rounded-md shadow-lg hover:shadow-none font-bold text-sm'
                    onClick={close}
                    >Fermer</button>
                </div>
            </div>
        )
    }
  return (
    <div className='w-[500px]'>
        <div className='bg-slate-900 p-2 text-white'>
            <strong>Finalisation de la réservation</strong>
        </div>
        <div className='m-2'>
            <p className='font-bold text-slate-900'>{chambre?.nom}</p>
            <p className='text-xs'>{hotel?.addresse}</p>
            <p className='text-xs'>{hotel?.quartier}, {hotel?.ville}, {hotel?.pays}</p>
        </div>

        <div className='grid grid-cols-3 m-2 mt-4 gap-2 place-center'>
        <div className='flex flex-col'>
            <strong className='text-slate-900 text-xs'>Total Nuit</strong>
            <div className='flex items-center gap-2 text-xs'>
                <button 
                onClick={remove_nb_nuit}
                className='border p-2 flex items-center justify-center shadow-lg hover:shadow-none rounded-md'>
                    <Icon name="remove" /></button>
                <p>{nb_nuit}</p>
                <button 
                onClick={add_nb_nuit}
                className='border p-2 flex items-center justify-center shadow-lg hover:shadow-none rounded-md'>
                    <Icon name="add" /></button>
            </div>
        </div>

        <div className='flex flex-col text-xs'>
            <strong>Prix Total</strong>
            <p>{total} €</p>
        </div>
        

        <div className='flex flex-col text-xs'>
            <strong>Date d'arrivée</strong>
            <input 
            value={arrivee}
            onChange={(e)=>set_arrivee(e.target.value)}
            type="date" className='bg-gray-200  p-2 rounded-md shadow-lg hover:shadow-none' />
            <p className='text-[10px] text-green-500 hidden'>Disponible à partir de 20/10/2023</p>
        </div>
        </div>

        <div className='m-2 mt-4 text-xs'> 
            <strong>Informations personnelles</strong>
            <div className=' grid grid-cols-3 gap-2'>
                <input 
                value={nom}
                onChange={e=>set_nom(e.target.value)}
                placeholder='Votre nom'
                type="text" className='border p-2 rounded-md shadow-lg hover:shadow-none outline-none'/>
                <input 
                value={telephone}
                onChange={e=>set_telephone(e.target.value)}
                placeholder='Votre téléphone'
                type="text" className='border p-2 rounded-md shadow-lg hover:shadow-none outline-none'/>
                <input
                value={email}
                onChange={e=>set_email(e.target.value)} 
                placeholder='Votre email'
                type="email" className='border p-2 rounded-md shadow-lg hover:shadow-none outline-none'/>
            </div>
        </div>

        <div className='m-2 mt-4'>
            <strong className='text-sm'>Moyens de paiement</strong>
            <div className='flex items-center gap-4'>
                <button 
                onClick={(e)=>set_moyen_payement(1)}
                className='flex items-center gap-2 text-xs border p-2 rounded-md shadow-lg hover:shadow-none'>
                    {moyen_payement==1 ? <Icon name="ellipse" />:<Icon name="ellipse-outline" />}
                    <p>TMoney</p>
                </button>

                <button 
                onClick={(e)=>set_moyen_payement(2)}
                className='flex items-center gap-2 text-xs border p-2 rounded-md shadow-lg hover:shadow-none'>
                    {moyen_payement==2 ? <Icon name="ellipse" />:<Icon name="ellipse-outline" />}
                    <p>Flooz</p>
                </button>
            </div>  
        </div>

        <div className='text-sm flex items-center justify-end gap-2 m-2 mt-4'>
            <button className='p-2 text-slate-900 opacity-70 hover:underline'
            onClick={close}
            >Annuler</button>
            <button
            disabled={sending}

            onClick={confirmer}
            className='p-2 bg-slate-900 text-white rounded-md shadow-lg hover:shadow-none font-bold w-[200px] flex items-center justify-center'>
                {sending==true ? <ActivityIndicator />:'Confirmer la réservation'}</button>
        </div>
        
    </div>
  )
}
