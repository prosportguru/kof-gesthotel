import React, { useEffect, useState } from 'react'
import Icon from './Icon'
import ActivityIndicator from "./ActivityIndicator";

export default function ModalDestination({close}) {
    const [search,set_search]=useState("")
    const [loading,set_loading]=useState(false)
    const [data,set_data]=useState(null)
    useEffect(()=>{
        if(search==""){
            set_data(null)
            set_loading(false)
            return;
        }
        load_data()
    },[search])

    const load_data=async ()=>{
        set_loading(true)
    }
  return (
    <div className='w-[50vw] text-slate-900'>
        <div className='border flex items-center  gap-2 p-1'>
            <Icon name="search-outline" />
            <input 
            value={search}
            onChange={(e)=>set_search(e.target.value)}
            type="text" placeholder='Destination' className='flex-1 p-1 border-none outline-none'/>
        </div>
        <div>
            {search=="" && <p className='text-gray-500 text-center m-2'>Saisissez une destination</p>}
            {search !="" && <p className='text-gray-500 text-center m-2'>Résultats pour <strong>{search}</strong></p>}
            {loading==true && <div className='flex items-center justify-center'><ActivityIndicator /></div>}
        </div>
    </div>
  )
}
