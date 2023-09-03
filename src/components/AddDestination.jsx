import React, { useEffect, useState } from 'react'
import ActivityIndicator from './ActivityIndicator'
import { db } from '../firebase_file'

export default function AddDestination({close,load_data,selected}) {
    const [pays,set_pays]=useState("")
    const [region,set_region]=useState("")
    const [ville,set_ville]=useState("")
    const [quartier,set_quartier]=useState("")
   
    const [sending,set_sending]=useState(false)

    useEffect(()=>{
        if(selected==null) return;
        set_pays(selected?.pays)
        set_region(selected?.region)
        set_ville(selected?.ville)
        set_quartier(selected?.quartier)
        
    },[selected])

    const valider=async ()=>{
       
       if(pays==""){
        alert("Le pays est vide");
        return;
       }
       if(region==""){
        alert("La région est vide");
        return;
       }
       if(ville==""){
        alert("La ville est vide");
        return;
       }
       if(quartier==""){
        alert("Le quartier est vide");
        return;
       }
       
       set_sending(true)

       const line={
       pays,region,ville,quartier
       }
       if(selected==null){
            await db.collection("destinations").add(line)
       }else{
        await db.collection("destinations").doc(selected?.key).update(line,{merge:true})
       }

       
       await load_data()
       close()
    }


  return (
    <div className='w-[300px] text-xs'>
        <div className='bg-slate-900 text-white  p-2'>
            <strong>Ajouter une destination</strong>
        </div>
        <div className='p-2 grid grid-cols-2 gap-2'>
             
            <div className='flex flex-col mb-2'>
                <strong>Pays</strong>
                <input 
                value={pays}
                onChange={e=>set_pays(e.target.value)}
                type="text" className='border outline-none bg-gray-100 p-2 rounded-md shadow-lg hover:shadow-none'/>
            </div>
            <div className='flex flex-col mb-2'>
                <strong>Région</strong>
                <input 
                value={region}
                onChange={e=>set_region(e.target.value)}
                type="email" className='border outline-none bg-gray-100 p-2 rounded-md shadow-lg hover:shadow-none'/>
            </div>
            <div className='flex flex-col mb-2'>
                <strong>Ville</strong>
                <input 
                value={ville}
                onChange={e=>set_ville(e.target.value)}
                type="text" className='border outline-none bg-gray-100 p-2 rounded-md shadow-lg hover:shadow-none'/>
            </div>

            <div className='flex flex-col mb-2'>
                <strong>Quartier</strong>
                <input 
                value={quartier}
                onChange={e=>set_quartier(e.target.value)}
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
