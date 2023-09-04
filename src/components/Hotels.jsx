import React, { useEffect, useState } from 'react'
import Hotel from './Hotel'
import { useNavigate } from 'react-router-dom'
import { db } from '../firebase_file';

export default function Hotels() {
    const [data,set_data]=useState(null);
    const navigate=useNavigate()

    useEffect(()=>{
        load_data()
    },[])

    const load_data=async ()=>{
        const snap=await db.collection("hotels").orderBy("note","desc").limit(4).get()
        let d=[]
        snap.docs.map((doc)=>{
            let id=doc.id;
            let dt=doc.data()
            dt.key=id;
            d.push(dt)
        })
        set_data(d)
    }
    const go_to_details_hotel=(hotel)=>{
        navigate("/details/"+hotel?.key)
    }
  return (
    <div>
        <h1 className='text-lg text-slate-900 font-semibold opacity-80'>A la recherche de l'endroit parfait pour séjourner ?</h1>
        {data!=null && data?.length>0 && <><p className='text-sm text-slate-900 opacity-70'>Les voyageurs ayant effectué des recherches similaires ont consulté ces hébergements.</p>
        <div className='grid grid-cols-4 gap-4 mt-4'>
            {data?.map((item,index)=>{
                return(
                    <Hotel item={item} index={index} key={index} go_to_details_hotel={go_to_details_hotel} />
                )
            })}
        </div>
        </>}
    </div>
  )
}
