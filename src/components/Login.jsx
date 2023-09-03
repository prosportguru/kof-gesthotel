import React, { useState } from 'react'
import logo from "../images/logo.png"
import Icon from './Icon'
import ActivityIndicator from './ActivityIndicator';
import { auth, db } from '../firebase_file';
export default function Login() {
    const [email,set_email]=useState("")
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
        try{
            await auth.signInWithEmailAndPassword(email,password)
        }catch(err){
            alert(err.message)
            set_sending(false)
            return;
        }

        set_sending(false)

       

    }
  return (
    <div className='flex items-center gap-4 bg-white p-4 rounded-md shadow-lg mt-16'>
        <div>
            <img src={logo} className='w-[80px] h-[80px] rounded-full'/>
        </div>
        <div>
            <strong className='text-center text-lg'>Se connecter</strong>
            <div className='flex items-center gap-2 text-sm bg-gray-200 p-2 rounded-md shadow-lg mt-4'>
                <Icon name="mail-outline" />
                <input type='email' 
                value={email}
                onChange={e=>set_email(e.target.value)}
                placeholder='Email' className='border-none outline-none bg-transparent flex-1' />
            </div>
            <div className='flex items-center gap-2 text-sm bg-gray-200 p-2 rounded-md shadow-lg mt-4'>
                <Icon name="lock-closed-outline" />
                <input 
                value={password}
                onChange={e=>set_password(e.target.value)}
                type='password' placeholder='Mot de passe' className='border-none outline-none bg-transparent flex-1' />
            </div>

            <div className='mt-4 flex items-center justify-center'>
                <button 
                disabled={sending}
                onClick={login}
                className='bg-blue-500 flex items-center justify-center w-[150px] p-2 border-none text-white text-sm font-bold rounded-md shadow-lg hover:shadow-none'>
                    {sending==true ? <ActivityIndicator />:"Valider"}
                </button>
            </div>

        </div>
    </div>
  )
}
