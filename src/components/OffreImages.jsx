import React from 'react'
import img4 from "../images/img4.png"
import img5 from "../images/img5.png"
import img6 from "../images/img6.png"
import img7 from "../images/img7.png"
import Icon from './Icon'

export default function OffreImages() {
  return (
    <div className='flex  gap-1 bg-white p-1'>
        <div className='flex-1'>
            <img src={img7} className='w-[100%] h-[254px] object-cover'/>
        </div>
        <div className='flex-1 grid grid-cols-2 gap-1'>
           {
            [img4,img5,img6, img7].map((img,index)=>{
                return(
                    <img key={index} src={img} className='w-[100%] h-[125px] object-cover'/>
                )
            })
           }
            
        </div>
    </div>
  )
}
