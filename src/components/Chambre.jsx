import React, { useState } from 'react'
import img4 from "../images/img4.png"
import img5 from "../images/img5.png"
import img6 from "../images/img6.png"
import img7 from "../images/img7.png"
import Icon from './Icon'

export default function Chambre({item,index}) {
    const [pos,set_pos]=useState(0);

    const images=item?.banners ?? []

    let img=images[pos].url ?? null;

  return (
    <div className='bg-white rounded-xl'>
        <div className='w-[100%] h-[180px] relative'>
            <img src={img} className='w-[100%] h-[180px] object-cover rounded-t-xl' />
            {images?.length>1 && <button 
            className='absolute bg-white w-[30px] h-[30px] rounded-full top-4 left-4 shadow-lg '>
                <Icon name="arrow-back" />
            </button>}

            {images?.length>1 && <button 
            className='absolute bg-white w-[30px] h-[30px] rounded-full top-4 right-4 shadow-lg '>
                <Icon name="arrow-forward" />
            </button>}
        </div>
        
        <div className='flex flex-col gap-2 p-2'>
            <h1 className='text-lg font-semibold mb-2'>Chambre supérieur, vue jardin</h1>
            <div className='flex items-center gap-2 text-sm text-slate-900 opacity-70'>
                <Icon name="people" style={{}} />
                <p>2 personnes</p>
            </div>
            <div className='flex items-center gap-2 text-sm text-slate-900 opacity-70'>
                <Icon name="bed" style={{}} />
                <p>1 très grand lit</p>
            </div>
            <div className='flex items-center gap-2 text-sm text-slate-900 opacity-70'>
                <Icon name="wifi" style={{}} />
                <p>Accès Wi-Fi gratuit</p>
            </div>
            <div className='flex items-center gap-2 text-sm text-slate-900 opacity-70'>
                <Icon name="car" style={{}} />
                <p>Parking sans voiturier gratuit</p>
            </div>
            <div className='flex items-center gap-2 text-sm text-slate-900 opacity-70'>
                <Icon name="checkmark" style={{}} />
                <p>Aucun prépaiement nécessaire</p>
            </div>
            <div className='flex items-center gap-2 text-sm text-slate-900 opacity-70'>
                <Icon name="dice-outline" style={{}} />
                <p>32 m<sup>2</sup></p>
            </div>
        </div>

        <div className='mt-4 p-2 border  border-l-0 border-r-0'>
            <h1 className='flex items-center justify-between mb-1'>
                <strong className='text-slate-900'>Extras</strong>
                <small className='tetx-slate-900 opacity-70'>par nuit</small>
            </h1>
            <div className='flex items-center justify-between'>
                <button className='flex items-center gap-2 text-slate-900 opacity-70 text-sm'>
                    <Icon name="ellipse" />
                    <p>Petit-déjeuner non compris</p>
                </button>
                <p className='font-bold text-sm text-slate-900'>+ 0 €</p>
            </div>
            <div className='flex items-center justify-between'>
                <button className='flex items-center gap-2 text-slate-900 opacity-70 text-sm'>
                    <Icon name="ellipse-outline" />
                    <p>Petit-déjeuner complet</p>
                </button>
                <p className='font-bold text-sm text-slate-900'>+ 50 €</p>
            </div>
        </div>

        <div className='mt-4 p-2 relative'>
            <h1 className='font-bold text-slate-900 text-lg'>1295 €</h1>
            <p className='text-sm text-slate-900 opacity-70'>Pour 4 nuits</p>
            <p className='text-sm text-slate-900 opacity-70'>324 € par nuit</p>
            <p className='text-sm text-slate-900 opacity-70'>taxes et frais compris</p>
            <button 
            className='absolute right-2 bottom-2 bg-blue-500 p-2 rounded-lg text-white font-bold shadow-lg hover:shadow-none'>Réserver</button>
        </div>
    </div>
  )
}
