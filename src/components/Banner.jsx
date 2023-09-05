import React, { useState } from 'react'
import img from "../images/img3.jpg"
import Modal from './Modal'
import Auth from './Auth'

export default function Banner({connected}) {
  const [open,set_open]=useState(false)
  return (
    <div className='mt-8 mb-8 flex items-center justify-center h-[400px] relative'>
        <img src={img}  className='h-[400px] w-[100%] object-cover rounded-lg blur-[2px]'/>
        <div className='absolute left-8 top-8 text-white w-[40%]'>
            <h1 className='text-5xl'>-20% ou plus pour les membres</h1>
            <p className='mt-4 font-semibold'>Devenez membre et bénécifiez de nos avantages aucours de tous vos hébergements via notre plateforme</p>
            <button
            disabled={connected}
            onClick={e=>set_open(true)}
            className='bg-blue-500 mt-4 p-4 border-none rounded-full shadow-lg font-bold hover:opacity-70'
            >
              {connected==true ? 'Vous êtes membre':'Accéder aux Prix membres'}
              </button>
        </div>

        {open==true && <Modal 
        close={()=>set_open(false)}
        content={<Auth 
        close={()=>set_open(false)}
        />}
        />}
    </div>
  )
}
