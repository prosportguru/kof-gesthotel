import React from 'react'
import Icon from "./Icon";
import map from "../images/map.png"

export default function HotelPresentation() {
  return (
    <div className='flex gap-4 bg-white border border-b-0 border-l-0 border-r-0 rounded-md '>
        <div className='flex-1 p-2'>
            <h1 className='text-slate-900 font-bold text-2xl'>Radisson blue hotel, dakar sea plaza</h1>
            <div className='flex items-center gap-1 opacity-60'>
                <Icon name="star" />
                <Icon name="star" />
                <Icon name="star" />
                <Icon name="star" />
            </div>
            <p className='text-slate-900 opacity-60 text-sm'>Hôtel 4 étoiles à Lomé avec une piscine extérieure et un restaurant </p>
            
            <div className='mt-4'>
                <h1 className="text-lg font-bold text-slate-900 ">7,8/10 Bien</h1>
            </div>
        </div>
        <div className=' p-2'>
            <img src={map}  className='rounded-md w-[400px] h-[200px] object-cover'/>
            <p className='text-slate-900 opacity-50'>Route del a corniche ouest, dakar, BP 16555</p>
        </div>
        
    </div>
  )
}
