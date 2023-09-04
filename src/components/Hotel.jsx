import React from 'react'
import img4 from "../images/img4.png"
import img5 from "../images/img5.png"
import img6 from "../images/img6.png"
import img7 from "../images/img7.png"
import Icon from './Icon'

export default function Hotel({index,item,go_to_details_hotel}) {
    const images=item?.banners ?? []
    let i=0;
    if(images?.length>0){
       i= Math.round(Math.random()*(images.length-1))
    }
    
    let img=images[i].url ?? null

    let note=parseFloat(item.note)
   
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
    <div
    onClick={go_to_details_hotel.bind(this,item)}
    className='rounded-md border shadow-lg cursor-pointer hover:shadow-none'>
        <img src={img} className='w-[100%] h-[120px] object-cover rounded-t-md'/>
        <div className='m-2'>
            <h1 className='text-sm text-slate-900 font-semibold'>{item?.nom}</h1>
            <p className='text-xs text-slate-900 opacity-70'>{item?.addresse}</p>
        </div>
        <div className='m-2 mt-4'>
            <p className='flex items-center gap-2 text-sm'>
                <strong>{item?.note}/10 </strong>
                <small>{str_note}</small>
            </p>
        </div>
    </div>
  )
}
