import React, { useState } from 'react'
import img4 from "../images/img4.png"
import img5 from "../images/img5.png"
import img6 from "../images/img6.png"
import img7 from "../images/img7.png"
import Icon from './Icon'

export default function Offre({item,index,go_to_offer_details,hotel,reserver}) {
    const [pos,set_pos]=useState(0);

    const images=item?.banners ?? [];

    let img=images[pos].url ?? null;

    let detail=hotel?.detail ?? ''
    if(detail.length>120){
        detail=detail.substr(0,120);
        detail+="...";
    }else{
        detail=detail.substr(0,120);
    }

    let prix=parseFloat(item?.prix_par_nuit);
    let remise=prix*0.2;
    remise=remise.toFixed(2)
    let prix_promo=prix-remise;
    
    const show_prev=()=>{
        let banners=item?.banners ?? []
        let p=pos-1;
        if(p<0){
            p=banners?.length-1;
        }

        set_pos(p)
    }
    const show_next=()=>{
        let banners=item?.banners ?? []
        let p=pos+1;
        if(p>=banners?.length){
            p=0;
        }

        set_pos(p)
    }
    
  return (
    <div className='bg-white cursor-pointer hover:opacity-90 ' onClick={go_to_offer_details.bind(this,item)}>
        <div className='relative'>
            <img src={img}  className='rounded-lg w-[100%] h-[300px] object-cover'/>
            {images?.length>1 &&<button
            onClick={show_prev} 
            className='absolute top-4 left-4 bg-white w-[30px] h-[30px] rounded-full flex items-center justify-center'>
                <Icon name="arrow-back" />
            </button>}
            {images?.length>1 &&<button 
            onClick={show_next}
            className='absolute top-4 right-4 bg-white w-[30px] h-[30px] rounded-full flex items-center justify-center'>
                <Icon name="arrow-forward" />
            </button>}
        </div>
        
        <div className='p-2 h-[100px]'>
            <h2 className='text-slate-900 text-sm font-bold'>{item?.nom}</h2>
            <h2 className='text-xs mt-1'>{hotel?.nom}</h2>
            <div className='flex items-center gap-1'>
                <Icon name="location-outline" />
                <h3 className='text-xs'>{hotel?.quartier}, {hotel?.ville}, {hotel?.pays}</h3>
            </div>
            
        </div>
        <p className='m-2 mt-2 text-xs'>{detail}</p>
        <div className='mt-2 p-2'>
            <h2 className='flex items-center gap-2'>
                <strong className='text-lg'>{prix_promo} € </strong>
                <small className='line-through'>{prix} €</small>
            </h2>
            <p className='text-xs'>Par nuit</p>
            <p className='text-xs text-green-500 hidden'>Disponible à partir de  20/09/2023</p>
        </div>
        <div className='flex items-center justify-between p-2'>
            <button className='bg-red-600 text-white font-bold text-xs p-2 mt-2 rounded-md shadow-lg'>-20 %</button>
            <button className='text-blue-500  font-bold text-xs p-2 mt-2 rounded-md hover:underline'
            onClick={reserver.bind(this,hotel,item)}
            >Réserver</button>
        </div>
        
    </div>
  )
}
