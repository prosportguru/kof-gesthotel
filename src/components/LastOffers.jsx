import React from 'react'
import Offre from './Offre'
import { useNavigate } from 'react-router-dom'

export default function LastOffers() {
    const navigate=useNavigate()
    const go_to_offer_details=(offer)=>{
        //navigate("/details/1");
    }
  return (
    <div className='m-2 mt-4'>
        <h1 className='text-4xl font-bold text-slate-900'>Offres de dernière minute pour le week-end</h1>
        <div className='flex'>
            <p className='text-slate-900 font-bold bg-white p-2 shadow-lg rounded-md'>8 setp. - 10 sept.</p>
        </div>

        <div className='m-2 grid grid-cols-4 gap-4'>
            {
                new Array(4).fill(4).map((item,index)=>{
                    return(
                        <Offre key={index} item={item} index={index} go_to_offer_details={go_to_offer_details} />
                    )
                })
            }
        </div>
        
    </div>
  )
}
