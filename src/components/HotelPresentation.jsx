import React from 'react'
import Icon from "./Icon";
import map from "../images/map.png"

export default function HotelPresentation({hotel}) {
    if(hotel==null) return null;
    let nb=parseInt(hotel?.star)

    let note=parseFloat(hotel?.note)
   
    let str_note=""
    if(note<7){
        str_note="Normal"
    }else if(note <8){
        str_note="Bien"
    }else if(note <9){
        str_note="Très bien"
    }else if(note<=10){
        str_note="Merveilleux"
    }
  return (
    <div className='flex gap-4 bg-white border border-b-0 border-l-0 border-r-0 rounded-md '>
        <div className='flex-1 p-2'>
            <h1 className='text-slate-900 font-bold text-2xl'>{hotel?.nom}</h1>
            <div className='flex items-center gap-1 opacity-60'>
                {new Array(nb).fill(nb).map((x,i)=>{
                    return <Icon name="star" key={i} />
                })}
            </div>
            <p className='text-slate-900 opacity-60 text-sm'>{hotel?.detail}</p>
            
            <div className='mt-4'>
                <h1 className="text-lg font-bold text-slate-900 ">{hotel?.note}/10 {str_note}</h1>
            </div>
        </div>
        <div className=' p-2 w-[300px]'>
            <img src={hotel.map}  className='rounded-md w-[300px] h-[200px] object-cover'/>
            <p className='text-slate-900 opacity-50'>{hotel?.addresse}</p>
        </div>
        
    </div>
  )
}
