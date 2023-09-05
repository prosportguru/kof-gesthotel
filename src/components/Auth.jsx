import React, { useEffect, useState } from 'react'
import ActivityIndicator from './ActivityIndicator';
import firebase from "firebase"
import { auth, db } from '../firebase_file';

export default function Auth() {
    const [form1,set_form1]=useState(true);
    const [nom,set_nom]=useState("")
    const [email,set_email]=useState("")
    const [telephone,set_telephone]=useState("")
    const [password,set_password]=useState("");
    const [sending,set_sending]=useState(false)

    

    const login=async ()=>{
        if(email==""){
            alert("L'email est vide");
            return;
        }
        if(password==""){
            alert("Le mot de passe est vide");
            return;
        }

        set_sending(true)
        let snap=await db.collection("clients").where("email","==",email).where("password","==",password).get()
        if(snap.docs.length==0){
            alert("Identifiants incorrectes")
            set_sending(false)
            return;
        }

        try{
            await auth.signInWithEmailAndPassword(email,password)
        }catch(err){
            let code=err.code;
            if(code=="auth/user-not-found"){
                try{
                    await auth.createUserWithEmailAndPassword(email,password)
                }catch(err2){
                    alert("Une erreur est survenue:\n"+err2.message)
                    set_sending(false)  
                }
            }else{
                alert("Une erreur est survenue:\n"+err.message)
                set_sending(false)
            }
           
            
        }

        window.location.href="";

    }

    const save=async ()=>{
        if(nom==""){
            alert("Le nom est vide");
            return;
        }
        if(telephone==""){
            alert("Le téléphone est vide");
            return;
        }
        if(email==""){
            alert("Le mail est vide");
            return;
        }
        if(password==""){
            alert("Le mot de passe est vide");
            return;
        }

        if(password?.length<6){
            alert("Le mot de passe est trop court");
            return;
        }

        set_sending(true)

        const snap=await db.collection("clients").where("email","==",email).get()
        if(snap.docs.length>0){
            alert("Cette addresse mail est déjà utilisée");
            set_sending(false)
            return;
        }
        let line={
            username:nom,email,telephone,password,date:firebase.firestore.FieldValue.serverTimestamp()
        }

        await db.collection("clients").add(line)
        set_email("");
        set_password("");
        set_sending(false)
        set_form1(true)
        alert("Inscription bien réussie")
    }
  return (
    <div className='w-[300px] text-sm'>
         <div className='bg-slate-900 p-2 text-white'>
            <strong>Authentifiez-vous</strong>
        </div>
        <div className='m-2'>
            <p>Une simple authentification vous permet d'avoir une reduction de 20% sur tous nos tarifs</p>

            {form1==true && <div className='mt-2'>
                <div className='flex flex-col'>
                    <strong>Email</strong>
                    <input 
                    value={email}
                    onChange={e=>set_email(e.target.value)}
                    type="email"  className='bg-gray-200 p-2 rounded-md shadow-lg hover:shadow-none outline-none'/>
                </div>

                <div className='flex flex-col'>
                    <strong>Mot de passe</strong>
                    <input 
                    value={password}
                    onChange={e=>set_password(e.target.value)}
                    type="password"  className='bg-gray-200 p-2 rounded-md shadow-lg hover:shadow-none outline-none'/>
                </div>

                <div className='flex items-center justify-between mt-2'>
                    <button 
                    onClick={e=>set_form1(false)}
                    className='text-xs'>
                        Pas encore inscrit ? <br /><strong className='text-blue-500 hover:underline'>Créer un compte</strong></button>
                    <button 
                    onClick={login}
                    disabled={sending}
                    className='flex items-center justify-center bg-slate-900 p-2 w-[100px] text-white rounded-md  shadow-lg hover:shadow-none '>
                        {sending==true ? <ActivityIndicator />:'Se connecter'}</button>
                </div>

            </div>}

            {form1==false && <div className='mt-2'>
                <h1>Création d'un compte</h1>
                <div className='flex flex-col'>
                    <strong>Nom</strong>
                    <input 
                    value={nom}
                    onChange={e=>set_nom(e.target.value)}
                    type="text"  className='bg-gray-200 p-2 rounded-md shadow-lg hover:shadow-none outline-none'/>
                </div>

                <div className='flex flex-col'>
                    <strong>Téléphone</strong>
                    <input 
                    value={telephone}
                    onChange={e=>set_telephone(e.target.value)}
                    type="text"  className='bg-gray-200 p-2 rounded-md shadow-lg hover:shadow-none outline-none'/>
                </div>

                <div className='flex flex-col'>
                    <strong>Email</strong>
                    <input 
                    value={email}
                    onChange={e=>set_email(e.target.value)}
                    type="email"  className='bg-gray-200 p-2 rounded-md shadow-lg hover:shadow-none outline-none'/>
                </div>

                <div className='flex flex-col'>
                    <strong>Mot de passe</strong>
                    <input 
                    value={password}
                    onChange={e=>set_password(e.target.value)}
                    type="password"  className='bg-gray-200 p-2 rounded-md shadow-lg hover:shadow-none outline-none'/>
                </div>

                <div className='flex items-center justify-between mt-2'>
                    <button 
                    disabled={sending}
                    onClick={e=>set_form1(true)}
                    className='text-xs'>
                       Déjà inscrit ? <br /><strong className='text-blue-500 hover:underline'>Se connecter</strong></button>
                    <button
                    onClick={save}
                    className='flex items-center justify-center bg-slate-900 p-2 w-[100px] text-white rounded-md  shadow-lg hover:shadow-none '>
                        {sending==true ? <ActivityIndicator />:"Valider"}
                    </button>
                </div>

            </div>}
        </div>
    </div>
  )
}
