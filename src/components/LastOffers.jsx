import React, { useEffect, useState } from 'react'
import Offre from './Offre'
import { useNavigate } from 'react-router-dom'
import ActivityIndicator from './ActivityIndicator'
import { db } from '../firebase_file'

export default function LastOffers() {
    const [data,set_data]=useState(null)
    const [hotels,set_hotels]=useState(null)
    useEffect(()=>{
        load_data()
    },[])
    const load_data=async ()=>{
        const snap=await db.collection("hotels").get()
        let d=[];
        snap.docs.map((doc)=>{
            let id=doc.id;
            let dt=doc.data()
            dt.key=id;
            d.push(dt)
        })
        set_hotels(d)

        const snap2=await db.collection("chambres").get()
        let d2=[];
        snap2.docs.map((doc)=>{
            let id=doc.id;
            let dt=doc.data()
            dt.key=id;
            d2.push(dt)
        })
        set_data(d2)
        
    }
    const navigate=useNavigate()
    const go_to_offer_details=(offer)=>{
        //navigate("/details/1");
    }
  return (
    <div className='m-2 mt-4'>
        <h1 className='text-4xl font-bold text-slate-900'>-20% sur tous nos prix pour les nos clients inscrits
        </h1>
        <div className='flex hidden'>
            <p className='text-slate-900 font-bold bg-white p-2 shadow-lg rounded-md'>8 setp. - 10 sept.</p>
        </div>
        {data==null && <div className='flex items-center justify-center'><ActivityIndicator /></div>}
        <div className='m-2 grid grid-cols-4 gap-4'>
            {
                data?.map((item,index)=>{
                    const hotel=hotels?.filter((x)=>{
                        return x.key==item?.hotel;
                    })[0] ?? null;

                    return(
                        <Offre 
                        hotel={hotel}
                        key={index} item={item} index={index} go_to_offer_details={go_to_offer_details} />
                    )
                })
            }
        </div>
        
    </div>
  )
}
