import React from 'react'
import Icon from './Icon'

export default function HotelEquipements() {
  return (
    <div className='p-2  border border-b-0 border-l-0 border-r-0 rounded-md bg-white'>
      <h1 className='text-2xl font-bold text-slate-900'>Nos équipements</h1>
      <div className='grid grid-cols-2 mt-2 gap-4'>
        <div className='flex items-center gap-2 text-sm text-slate-900 opacity-70'>
            <Icon name="thunderstorm-outline" style={{}} />
            <p>Piscine</p>
        </div>
        <div className='flex items-center gap-2 text-sm text-slate-900 opacity-70'>
            <Icon name="car" style={{}} />
            <p>Transfert aéroport</p>
        </div>
        <div className='flex items-center gap-2 text-sm text-slate-900 opacity-70'>
            <Icon name="car" style={{}} />
            <p>Parking gratuit</p>
        </div>
        <div className='flex items-center gap-2 text-sm text-slate-900 opacity-70'>
            <Icon name="rose" style={{}} />
            <p>Spa</p>
        </div>
        <div className='flex items-center gap-2 text-sm text-slate-900 opacity-70'>
            <Icon name="paw" style={{}} />
            <p>Animaux de compagnie acceptés</p>
        </div>
        <div className='flex items-center gap-2 text-sm text-slate-900 opacity-70'>
            <Icon name="wifi" style={{}} />
            <p>Wi-Fi haut débit gratuit</p>
        </div>
      </div>
    </div>
  )
}
