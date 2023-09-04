import React, { useEffect, useState } from 'react'
import Icon from './Icon'

export default function ModalVoyageur({close,set_voyageur,voyageur}) {
    const [personne,set_personne]=useState(1);
    const [chambre,set_chambre]=useState(1);

    useEffect(()=>{
        if(voyageur==null) return;
        set_chambre(voyageur?.chambre)
        set_personne(voyageur?.personne)
    },[])
    useEffect(()=>{
        set_voyageur({personne,chambre})
    },[chambre,personne])

  return (
    <div className='w-[400px] text-slate-900 p-2 flex items-center justify-around pt-5'>
        <div className='flex flex-col items-center gap-2'>
            <strong>Chambre</strong>
            <div className='flex items-center gap-2'>
                <button 
                onClick={()=>{let nv=chambre-1; if(nv<1){nv=1}; set_chambre(nv)}}
                className='border p-2 flex items-center justify-center rounded-md shadow-lg hover:shadow-none'>
                    <Icon name="remove" /></button>
                <p>{chambre}</p>
                <button 
                onClick={()=>set_chambre(chambre+1)}
                className='border p-2 flex items-center justify-center rounded-md shadow-lg hover:shadow-none'>
                    <Icon name="add" /></button>
            </div>
        </div>

        <div className='flex flex-col  items-center gap-2'>
            <strong>Personne</strong>
            <div className='flex items-center gap-2'>
                <button
                onClick={()=>{let nv=personne-1; if(nv<1){nv=1}; set_personne(nv)}}
                className='border p-2 flex items-center justify-center rounded-md shadow-lg hover:shadow-none'>
                    <Icon name="remove" /></button>
                <p>{personne}</p>
                <button 
                onClick={()=>set_personne(personne+1)}
                className='border p-2 flex items-center justify-center rounded-md shadow-lg hover:shadow-none'>
                    <Icon name="add" /></button>
            </div>
        </div>
    </div>
  )
}
