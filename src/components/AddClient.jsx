import React, { useEffect, useState } from 'react'
import ActivityIndicator from './ActivityIndicator'
import { db } from '../firebase_file'

export default function AddClient({close,load_data,selected}) {
    const [type,set_type]=useState("")
    const [nom,set_nom]=useState("")
    const [email,set_email]=useState("")
    const [password,set_password]=useState("")
    const [telephone,set_telephone]=useState("")
    const [sending,set_sending]=useState(false)

    useEffect(()=>{
        if(selected==null) return;
        set_type(selected?.type)
        set_nom(selected?.username)
        set_email(selected?.email)
        set_password(selected?.password);
        set_telephone(selected?.telephone ?? '')
    },[selected])

    const valider=async ()=>{
       
       if(nom==""){
        alert("Le nom est vide");
        return;
       }
       if(email==""){
        alert("L'email est vide");
        return;
       }
       if(password==""){
        alert("Le mot de passe est vide");
        return;
       }
       if(telephone==""){
        alert("Le téléphone est vide");
        return;
       }
       if(password?.length<6){
        alert("Le mot de passe est trop court (minimums 6 caractères) ");
        return;
       }
       set_sending(true)

       const line={
        type,
        username:nom,
        password,
        email,
        telephone,
       }
       if(selected==null){
            const snap=await db.collection("clients").where("email","==",email).get()
            if(snap.docs.length>0){
            alert("Cette addresse mail est déjà utilisée");
            set_sending(false)
            return;
            }
            await db.collection("clients").add(line)
       }else{
        await db.collection("clients").doc(selected?.key).update(line,{merge:true})
       }

       
       await load_data()
       close()
    }


  return (
    <div className='w-[300px] text-xs'>
        <div className='bg-slate-900 text-white  p-2'>
            <strong>Ajouter un client</strong>
        </div>
        <div className='p-2'>
             <div className='flex flex-col mb-2 hidden'>
                <strong>Type </strong>
                <select className='p-2 rounded-md shadow-lg hover:shadow-none' 
                value={type}
                onChange={e=>set_type(e.target.value)}
                >
                    <option value=""></option>
                    <option value={1}>Super Admin</option>
                    <option value={2}>Admin</option>
                </select>
            </div>
            <div className='flex flex-col mb-2'>
                <strong>Nom</strong>
                <input 
                value={nom}
                onChange={e=>set_nom(e.target.value)}
                type="text" className='border outline-none bg-gray-100 p-2 rounded-md shadow-lg hover:shadow-none'/>
            </div>
            <div className='flex flex-col mb-2'>
                <strong>Téléphone</strong>
                <input 
                value={telephone}
                onChange={e=>set_telephone(e.target.value)}
                type="text" className='border outline-none bg-gray-100 p-2 rounded-md shadow-lg hover:shadow-none'/>
            </div>
            <div className='flex flex-col mb-2'>
                <strong>Email</strong>
                <input 
                value={email}
                onChange={e=>set_email(e.target.value)}
                type="email" className='border outline-none bg-gray-100 p-2 rounded-md shadow-lg hover:shadow-none'/>
            </div>
            <div className='flex flex-col mb-2'>
                <strong>Mot de passe</strong>
                <input 
                value={password}
                onChange={e=>set_password(e.target.value)}
                type="password" className='border outline-none bg-gray-100 p-2 rounded-md shadow-lg hover:shadow-none'/>
            </div>
            <div className='flex flex-col mb-2 mt-4 items-center justify-center'>
                <button 
                disabled={sending}
                onClick={valider}
                className='bg-slate-900  text-white p-2 w-[100px] rounded-md shadow-lg hover:shadow-none flex items-center justify-center'>
                    {sending==true ? <ActivityIndicator />:"Valider"}
                </button>
            </div>
            
        </div>
    </div>
  )
}
