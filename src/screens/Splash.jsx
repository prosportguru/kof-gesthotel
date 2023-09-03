import React, { useEffect } from 'react'
import logo from "../images/logo.png"
import { auth } from '../firebase_file'
import { useNavigate } from 'react-router-dom'

export default function Splash() {
    const navigate=useNavigate()
    useEffect(()=>{
        auth?.onAuthStateChanged((user)=>{
            if(user==null){
                console.log("user not connect")
            }else{
                console.log("user connected",user?.email)
            }

            navigate("/fr");
        })
    },[auth])
  return (
    <div className='bg-slate-50 h-[100vh] flex items-center justify-center flex-col'>
        <img src={logo}  className='w-[100px] h-[100px] rounded-full shadow-lg animate-pulse'/>
        <p className='text-sm'>Chargement...</p>
    </div>
  )
}
