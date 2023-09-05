import React, { useEffect, useState } from 'react'
import logo from "../images/logo.png";
import { useNavigate } from 'react-router-dom';
import Icon from "./Icon";
import { auth, db } from '../firebase_file';
import Auth from './Auth';
import Modal from './Modal';
export default function Nav() {
    const [user,set_user]=useState(null)
    const [open,set_open]=useState(false)

    useEffect(()=>{

        auth.onAuthStateChanged((u)=>{
            if(u==null){

            }else{
                let email=u?.email;
                load_user_info(email)
            }
        })
       

        
    },[])

    const load_user_info=async (email)=>{
        let snap=await db.collection("clients").where("email","==",email).get()
        if(snap.docs.length>0){
            let doc=snap.docs[0]
            let id=doc.id;
            let dt=doc.data()
            dt.key=id;
            set_user(dt)
        }
    }

    const sign_out=async ()=>{
        await auth?.signOut();
        window.location.href=""
    }
    const navigate=useNavigate()
    const go_home=()=>{
        navigate("/fr");
    }
  return (
    <div className="bg-white p-2 border border-t-0 border-l-0 border-r-0 flex items-center justify-between">
        <div className='w-[60px] h-[60px] hover:opacity-70 cursor-pointer' onClick={go_home}>
         <img src={logo} className='w-[60px] h-[60px] rounded-full object-contain' />
        </div>

        <nav className='flex items-center gap-10'>
            <button className='font-semibold text-blue-500 text-base hover:text-blue-900 flex items-center gap-1'>
               <Icon name="arrow-redo-outline" style={{color:"gray",fontSize:"20px"}}/>
                Publier votre annonce</button>
            <button className='font-semibold text-blue-500 text-base hover:text-blue-900 flex items-center gap-1'>
            <Icon name="umbrella-outline" style={{color:"gray",fontSize:"20px"}}/>
                Assistance</button>
            {user!=null && <button 
            className='shadow-lg hover:shadow-none bg-gray-200  w-[40px] h-[40px] flex items-center justify-center rounded-full font-semibold text-blue-500 text-base hover:text-blue-900 flex items-center gap-1'>
                {user?.username?.substr(0,2).toUpperCase()}
            </button>}

                {user!=null && <button 
                onClick={sign_out}
            className='font-semibold text-blue-500 text-base hover:text-blue-900 flex items-center gap-1'>
                <Icon name="power-outline" style={{color:"gray",fontSize:"20px"}}/>
                Se déconnecter
                </button>}

                {user==null && <button 
                onClick={e=>set_open(true)}
            className='font-semibold text-blue-500 text-base hover:text-blue-900 flex items-center gap-1'>
                <Icon name="person-outline" style={{color:"gray",fontSize:"20px"}}/>
                Se connecter</button>}
        </nav>

        {open==true && <Modal 
        close={()=>set_open(false)}
        content={<Auth 
        close={()=>set_open(false)}
        />}
        />}
        
    </div>
  )
}
