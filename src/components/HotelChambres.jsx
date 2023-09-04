import React, { useEffect, useState } from 'react'
import Icon from './Icon'
import Chambre from './Chambre'
import Modal from './Modal'
import ModalDestination from './ModalDestination'
import ModalVoyageur from './ModalVoyageur'
import ActivityIndicator from './ActivityIndicator'
import { db } from '../firebase_file'

export default function HotelChambres({hotel}) {
  const [open_dst,set_open_dst]=useState(false)
  const [open_voyageur,set_open_voyageur]=useState(false)
  const [dst,set_dst]=useState(null);
  const [voyageur,set_voyageur]=useState(null)
  const [chambres,set_chambres]=useState(null)

  useEffect(()=>{
    load_chambres()
  },[])
  const load_chambres=async ()=>{
    if(hotel==null) return;
    const snap=await db.collection("chambres").where("hotel","==",hotel?.key).get()
    let d=[]
    snap.docs.map((doc)=>{
      let id=doc.id;
      let dt=doc.data()
      dt.key=id;
      d.push(dt)
    })
    set_chambres(d)
  }

  if(hotel==null) return null;
  return (
    <div className='p-2  border border-b-0 border-l-0 border-r-0 rounded-md '>
      <h1 className='text-2xl font-bold text-slate-900'>Choisissez votre chambre</h1>
      <div className='flex gap-4 items-center mt-2 text-xs hidden'>
            <div 
            className='flex-1 border border-slate-600 flex items-center gap-2 rounded-md bg-white shadow-lg p-1 cursor-pointer hover:opacity-70'>
                <div className='flex flex-col  w-[100%]'>
                    <h2 className='text-slate-900 font-semibold'>Arrivée</h2>
                    <input type="date" className='text-gray-500 border-none outline-none bg-transparent' />
                </div>
            </div>

            <div className='flex-1 border border-slate-600 flex items-center gap-2 rounded-md bg-white shadow-lg p-1 cursor-pointer hover:opacity-70'>
                <div className='flex flex-col w-[100%]'>
                    <h2 className='text-slate-900 font-semibold'>Départ</h2>
                    <input type="date" className='text-gray-500 border-none outline-none bg-transparent' />
                </div>
            </div>
            <div 
            onClick={()=>set_open_voyageur(true)}
            className='flex-1 border border-slate-600 flex items-center gap-2 rounded-md bg-white shadow-lg p-1 cursor-pointer hover:opacity-70'>
                <Icon name="person" style={{color:"blue",fontSize:"24px"}} />
                <div className='flex flex-col'>
                    <h2 className='text-slate-900 font-semibold'>Voyageurs</h2>
                    <p style={{color:"gray"}}>2 personnes, 1 chambre</p>
                </div>
            </div>
           
        </div>
        {chambres==null && <ActivityIndicator />}
        {chambres != null && chambres?.length==0 && <p className="text-sm text-gray-500">Aucune chambre n'est trouvée</p>}
        {chambres!=null && chambres?.length>0 && <div className='grid grid-cols-3 gap-4 mt-4'>
          {
            chambres.map((chambre,index)=>{
              return(
                  <Chambre key={index} item={chambre} index={index}/>
              )
            })
          }
        </div>}

        {open_dst==true && <Modal 
        close={()=>set_open_dst(false)}
        content={<ModalDestination 
        close={()=>set_open_dst(false)}
        />}
        />}

        {open_voyageur==true && <Modal 
        close={()=>set_open_voyageur(false)}
        content={<ModalVoyageur 
        close={()=>set_open_voyageur(false)}
        />}
        />}
    </div>
  )
}
