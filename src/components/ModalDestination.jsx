import React, { useEffect, useState } from 'react'
import Icon from './Icon'
import ActivityIndicator from "./ActivityIndicator";
import {db} from "../firebase_file";

export default function ModalDestination({close,set_dst}) {
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
        let s=search?.toLocaleLowerCase() ?? ""
        const snap=await db.collection("destinations").get();
       
        let d=[]
        snap.docs.map((doc)=>{
            let id=doc.id;
            let dt=doc.data()
            dt.key=id;
            let pays=dt.pays.toLocaleLowerCase();
            let region=dt.region.toLocaleLowerCase();
            let ville=dt.ville.toLocaleLowerCase();
            if (pays?.includes(s) || region?.includes(s) || ville.includes(s)){
                d.push(dt)
            }
        })
        set_data(d)

        set_loading(false)
        
    }
  return (
    <div className='w-[30vw] text-slate-900'>
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
            {data!=null && data?.length==0 && <p className='text-[10px] text-center'>Aucune destination trouvée</p>}
            {data!=null && data?.length>0 && <div>
                {data?.map((d,i)=>{
                    console.log(d)
                    return(
                        <div key={i} className='m-1 flex items-center gap-2 cursor-pointer hover:opacity-70' onClick={()=>{
                            set_dst(d)
                            close()
                        }}>
                            <Icon name="location" />
                            <p style={{color:"gray"}}>{d?.quartier}, {d?.ville}, Région {d?.region}, {d?.pays}</p>
                        </div>
                    )
                })}    
            </div>}
        </div>
    </div>
  )
}
