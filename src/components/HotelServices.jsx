import React from 'react'
import Icon from './Icon'

export default function HotelServices() {
  return (
    <div className='p-2  border border-b-0 border-l-0 border-r-0 rounded-md bg-white'>
      <h1 className='text-2xl font-bold text-slate-900'>Nos services</h1>
      <div className='grid grid-cols-2 mt-2 gap-4'>
        <div className='flex items-center gap-2 text-sm text-slate-900 opacity-70'>
            <Icon name="ellipse" />
            <p>Réception ouverte 24 h/24</p>
        </div>
        <div className='flex items-center gap-2 text-sm text-slate-900 opacity-70'>
          <Icon name="ellipse" />
            <p>Service de conciergerie</p>
        </div>
        <div className='flex items-center gap-2 text-sm text-slate-900 opacity-70'>
          <Icon name="ellipse" />
            <p>Service de blanchisserie</p>
        </div>
        <div className='flex items-center gap-2 text-sm text-slate-900 opacity-70'>
          <Icon name="ellipse" />
            <p>Salon de coiffure</p>
        </div>
        <div className='flex items-center gap-2 text-sm text-slate-900 opacity-70'>
          <Icon name="ellipse" />
            <p>Chaises longues en bord de piscine</p>
        </div>
        <div className='flex items-center gap-2 text-sm text-slate-900 opacity-70'>
            <Icon name="ellipse" />
            <p>Journaux gratuit dans le hall</p>
        </div>
      </div>
    </div>
  )
}
