import React from 'react'
import Icon from './Icon'

export default function Avantages() {
  return (
    <div className='m-2 mt-8'>
        <h1 className='text-4xl text-slate-900 font-bold'>Avec notre plateforme, c'est facile et avantageux. Toujours.</h1>
        <div className='flex gap-4  m-4'>
            <div className='flex-1 flex items-center gap-2'>
                <div className='bg-blue-500 w-[50px] h-[50px] flex items-center justify-center rounded-full shadow-lg'>
                    <Icon name="cart-outline" style={{fontSize:"30px",color:"white"}} />
                </div>
                <div className='flex-1'>
                    <h2 className='text-slate-900 font-bold text-lg'>Facilité d'utilisation</h2>
                    <p className='text-sm'>Nous vous facilitons le processus de réservation en ligne sans bouger de chez vous.</p>
                    <a href="#" className='text-blue-500 text-xs  hover:opacity-70 hover:underline'>En savoir plus</a>
                </div>
            </div>

            <div className='flex-1 flex items-center gap-2'>
                <div className='bg-blue-500 w-[50px] h-[50px] flex items-center justify-center rounded-full shadow-lg'>
                    <Icon name="git-merge-outline" style={{fontSize:"30px",color:"white"}} />
                </div>
                <div className='flex-1'>
                    <h2 className='text-slate-900 font-bold text-lg'>Flexibilité</h2>
                    <p className='text-sm'>Possibilité de modifier les réservations existantes en cas de changement de dates, de chambres ou de services supplémentaire</p>
                    <a href="#" className='text-blue-500 text-xs  hover:opacity-70 hover:underline'>En savoir plus</a>
                </div>
            </div>

            <div className='flex-1 flex items-center gap-2'>
                <div className='bg-blue-500 w-[50px] h-[50px] flex items-center justify-center rounded-full shadow-lg'>
                    <Icon name="arrow-undo-outline" style={{fontSize:"30px",color:"white"}} />
                </div>
                <div className='flex-1'>
                    <h2 className='text-slate-900 font-bold text-lg'>Annulation gratuite</h2>
                    <p className='text-sm'>Profitez de nos politiques d'annulation de réservation.</p>
                    <a href="#" className='text-blue-500 text-xs  hover:opacity-70 hover:underline'>En savoir plus</a>
                </div>
            </div>

        </div>
    </div>
  )
}
