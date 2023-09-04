import React, { useEffect, useState } from 'react'
import img4 from "../images/img4.png"
import img5 from "../images/img5.png"
import img6 from "../images/img6.png"
import img7 from "../images/img7.png"
import Icon from './Icon'

export default function ResultItem({item,index,go_to_hotel_details,hotel,notes,state}) {
    const [pos,set_pos]=useState(0);
    const {dst,arrive,depart,voyageur}=state;
    let {pays,region,ville,quartier}=dst;
    pays=pays?.toLowerCase()
    region=region?.toLowerCase()
    ville=ville?.toLowerCase()
    quartier=quartier?.toLowerCase()
    
    let p=hotel?.pays?.toLowerCase() 
    let r=hotel?.region?.toLowerCase();
    let v=hotel?.ville?.toLowerCase();
    let q=hotel?.quartier?.toLowerCase();

    let show=pays.includes(p) && region?.includes(r) && ville?.includes(v)
   

    
    const images=item?.banners;

    let img=images[pos].url;
    let nb=parseInt(hotel.star);
    let note=parseFloat(hotel.note)
    console.log(notes,note)
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

    const next_img=()=>{
        let banners=item?.banners ?? []
        let p=pos+1;
        if(p>=banners?.length){
            p=0;
        }

        set_pos(p)
    }
    const prev_img=()=>{
        let banners=item?.banners ?? []
        let p=pos-1;
        if(p<0){
            p=banners?.length-1;
        }

        set_pos(p)
    }

    if(show==false) return null;
  return (
    <div className='mb-4 flex gap-4 bg-white rounded-2xl shadow-lg cursor-pointer'>
        <div className='w-[300px] relative'>
            <img src={img} className='w-[100%] h-[250px] object-cover rounded-l-2xl' />

            {images?.length>1 &&<button 
            onClick={prev_img}
            className='absolute top-4 left-4 bg-white w-[30px] h-[30px] rounded-full shadow-lg border-none hover:shadow-none'>
                <Icon name="arrow-back" style={{color:"black"}}/> 
            </button>}

            {images?.length>1 &&<button 
                onClick={next_img}
            className='absolute top-4 right-4 bg-white w-[30px] h-[30px] rounded-full shadow-lg border-none hover:shadow-none'>
                <Icon name="arrow-forward" style={{color:"black"}}/>
            </button>}

            
            
        </div>
        <div className='flex-1 pb-2'  >
            <h1 className='text-slate-900 font-semibold text-xl'>{item?.nom}</h1>
            <h1 className='text-sm  opacity-70'>{hotel?.nom}</h1>
            <h1 className='text-sm text-slate-900 opacity-70'>{hotel?.quartier}, {hotel?.ville}, {hotel?.region}, {hotel?.pays}</h1>
            <h1 className='text-sm text-slate-900 opacity-70'>{hotel?.addresse}</h1>
            <div className='text-slate-900'>
                {new Array(nb).fill(nb).map((s,i)=>{
                    return <Icon name="star" style={{}} key={i}/>
                })}
                
            </div>
            <div className='mt-2  grid grid-cols-3  gap-4 text-sm'>
                {item?.equipements?.map((x,i)=>{
                    return(
                    <div className='flex items-center gap-1 m-1' key={i}>
                        <Icon name={x.icon} style={{fontSize:"20px"}} />
                        <p className='text-left text-xs'>{x?.nom}</p>
                    </div>
                    )
                })}
                {/*item?.services?.map((x,i)=>{
                    return(
                    <div className='flex items-center gap-1 m-1' key={i}>
                        <Icon name={x.icon} style={{fontSize:"20px"}} />
                        <p className='text-left text-xs'>{x?.nom}</p>
                    </div>
                    )
                })*/}
            
            </div>



            <div className='flex mt-4'>
                <div className='flex-1 flex items-center gap-1'>
                    <button className='bg-gray-200 p-2 rounded-md text-sm'>{hotel?.note}</button>
                    <div className='flex flex-col  text-sm'>
                        <h1 className='font-bold text-slate-900'>{str_note}</h1>
                        <p>0 avis</p>
                    </div>
                </div>
                <div className='flex flex-col mr-2 items-end'>
                    <h1 className='font-bold text-slate-900 text-lg'>{item?.prix_par_nuit} €</h1>
                    <p className='text-sm text-gray-500'>par nuit</p>
                </div>
            </div>

            <div className='mt-4 flex items-center justify-end gap-4 mr-2 border  pt-1 border-b-0 border-l-0 border-r-0'>
                <button className='text-[12px] text-blue-500 hover:underline cursor-pointer'
                onClick={go_to_hotel_details.bind(this,hotel)}
                >Plus d'offres de cet hôtel</button>
                <button className='bg-slate-900 p-2 text-white rounded-md border-none text-sm shadow-lg hover:shadow-none'>Réserver</button>
            </div>
            
        </div>
    </div>
  )
}
