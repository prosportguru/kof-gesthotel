import React, { useEffect, useState } from 'react'
import ActivityIndicator from './ActivityIndicator'
import { db } from '../firebase_file'
import Icon from './Icon'
import AddIcon from './AddIcon'
import Modal from './Modal'

export default function AddChambre({close,load_data,selected}) {
    
    const [nom,set_nom]=useState("")
    const [icon,set_icon]=useState("")
    const [open_icon,set_open_icon]=useState(false)
   
   
    const [sending,set_sending]=useState(false)

    useEffect(()=>{
        if(selected==null) return;
       
        set_nom(selected?.nom)
        set_icon(selected?.icon)
        
    },[selected])

    const valider=async ()=>{
     
       if(nom==""){
        alert("Le nom est vide");
        return;
       }
       if(icon==""){
        alert("L'icon est vide");
        return;
       }
      
      
       set_sending(true)

       const line={
       nom,icon
       }
       if(selected==null){
            
            await db.collection("chambres").add(line)
       }else{
        await db.collection("chambres").doc(selected?.key).update(line,{merge:true})
       }

       
       await load_data()
       close()
    }


  return (
    <div className='w-[600px] text-xs'>
        <div className='bg-slate-900 text-white  p-2'>
            <strong>Ajouter une chambre</strong>
        </div>
        <div className='p-2'>
            
            <div className='flex flex-col  mb-2 flex-1'>
                <strong>Nom</strong>
                <input 
                value={nom}
                onChange={e=>set_nom(e.target.value)}
                type="text" className='border outline-none bg-gray-100 p-2 rounded-md shadow-lg hover:shadow-none'/>
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
