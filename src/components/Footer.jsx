import React, { useEffect, useState } from 'react'
import { db } from '../firebase_file'
import { useNavigate } from 'react-router-dom';

export default function Footer() {
    const [destinations,set_destinations]=useState(null)
    const [hotels,set_hotels]=useState(null);

    const navigate=useNavigate()
    useEffect(()=>{
        load_destinations()
        load_hotels()
    },[])

    const load_hotels=async ()=>{
        let snap=await db.collection("hotels").orderBy("note","desc").limit(5).get();
        let d=[]
        snap.docs.map((doc)=>{
            let id=doc.id;
            let dt=doc.data()
            dt.key=id;
            d.push(dt)
        })
        set_hotels(d)
    }

    const load_destinations=async ()=>{
        let snap=await db.collection("destinations").limit(5).get();
        let d=[]
        snap.docs.map((doc)=>{
            let id=doc.id;
            let dt=doc.data()
            dt.key=id;
            d.push(dt)
        })
        set_destinations(d)
    }

    const go_to_hotel=(hotel)=>{
        navigate("/details/"+hotel.key)
    }
  return (
    <div className='bg-white mt-8'>
        <h1 className='text-blue-500 font-bold m-2 text-xl'>KOF GESTHOTEL</h1>
        <div className='flex gap-2 p-2 pb-4'>
            <div className='flex-1'>
                <h1 className='font-bold text-slate-900'>Destinations phares</h1>
                <ol className='text-sm flex flex-col gap-3'>
                    {hotels?.map((x,i)=>{
                        return(
                            <li 
                            onClick={go_to_hotel.bind(this,x)}
                            key={x.key}
                            className='text-blue-500 hover:underline cursor-pointer hover:opacity-90'><a>{x.pays}: {x?.nom}</a></li>
                        )
                    })}
                    
                </ol>
            </div>
            <div className='flex-1'>
                <h1 className='font-bold text-slate-900'>Pays et régions principaux</h1>
                <ol className='text-sm flex flex-col gap-3'>
                    {destinations?.map((x,i)=>{
                            return(
                                <li
                                key={i}
                                className='text-blue-500 hover:underline cursor-pointer hover:opacity-90'><a>{x.pays}, Région {x.region}</a></li>
                            )
                        })}
                   
                </ol>
            </div>
            <div className='flex-1'>
                
                <h1 className='font-bold text-slate-900'>Assistance et FAQ</h1>
                <ol className='text-sm flex flex-col gap-3'>
                    <li className='text-blue-500 hover:underline cursor-pointer hover:opacity-90'><a>Vos réservations</a></li>
                    <li className='text-blue-500 hover:underline cursor-pointer hover:opacity-90'><a>FAQ</a></li>
                    <li className='text-blue-500 hover:underline cursor-pointer hover:opacity-90'><a>Nous contacter</a></li>
                </ol>
            </div>
            <div className='flex-1'>
                <h1 className='font-bold text-slate-900'>Autres informations</h1>
                <ol className='text-sm flex flex-col gap-3'>
                    <li className='text-blue-500 hover:underline cursor-pointer hover:opacity-90'><a>Qui sommes-nous ?</a></li>
                    <li className='text-blue-500 hover:underline cursor-pointer hover:opacity-90'><a>Conditions générales d'utilisation</a></li>
                    <li className='text-blue-500 hover:underline cursor-pointer hover:opacity-90'><a>Politiques sur la protection des données</a></li>
                    <li className='text-blue-500 hover:underline cursor-pointer hover:opacity-90'><a>Mentions légales</a></li>
                </ol>
            </div>
        </div>
    </div>
  )
}
