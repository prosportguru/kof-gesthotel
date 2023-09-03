import React from 'react'
import img4 from "../images/img4.png"
import img5 from "../images/img5.png"
import img6 from "../images/img6.png"
import img7 from "../images/img7.png"
import Icon from './Icon'

export default function Hotel({index,item,go_to_details_hotel}) {
    const images=[img4,img5,img6,img7];
    let img=images[index]
  return (
    <div
    onClick={go_to_details_hotel.bind(this,item)}
    className='rounded-md border shadow-lg cursor-pointer hover:shadow-none'>
        <img src={img} className='w-[100%] h-[120px] object-cover rounded-t-md'/>
        <div className='m-2'>
            <h1 className='text-sm text-slate-900 font-semibold'>Hotel name</h1>
            <p className='text-xs text-slate-900 opacity-70'>Lomé</p>
        </div>
        <div className='m-2 mt-4'>
            <p className='flex items-center gap-2 text-sm'>
                <strong>8,4/10 </strong>
                <small>Très bien</small>
            </p>
        </div>
    </div>
  )
}
