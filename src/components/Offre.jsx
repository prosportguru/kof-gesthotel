import React from 'react'
import img4 from "../images/img4.png"
import img5 from "../images/img5.png"
import img6 from "../images/img6.png"
import img7 from "../images/img7.png"

export default function Offre({item,index,go_to_offer_details}) {
    const images=[img4,img5,img6,img7];
    let img=images[index]
  return (
    <div className='bg-white cursor-pointer hover:opacity-90 ' onClick={go_to_offer_details.bind(this,item)}>
        <img src={img}  className='rounded-lg w-[100%] h-[300px] object-cover'/>
        <div className='p-2'>
            <h2 className=''>Trademark Hotel</h2>
            <h3 className='text-sm'>Cotonou</h3>
            <p className='mt-2 text-xs'>Séjournez dans cet hotel 4 étoiles avec spa à Cotonou. Cet hébergement propose un parking gratuit, 2 restaurants et un spa proposant des soins...</p>
        </div>
        <div className='mt-2 p-2'>
            <h2 className='flex items-center gap-2'>
                <strong className='text-lg'>205 € </strong>
                <small className='line-through'>256 €</small>
            </h2>
            <p className='text-xs'>Pour 2 nuits</p>
            <p className='text-xs'>102 € par nuit</p>
            <p className='text-xs'>taxes et frais compris</p>
        </div>
        <div className='flex items-center justify-between p-2'>
            <button className='bg-red-600 text-white font-bold text-xs p-2 mt-2 rounded-md shadow-lg'>-20 %</button>
            <button className='text-blue-500  font-bold text-xs p-2 mt-2 rounded-md hover:underline'>Réserver</button>
        </div>
        
    </div>
  )
}
