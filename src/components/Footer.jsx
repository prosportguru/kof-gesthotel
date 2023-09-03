import React from 'react'

export default function Footer() {
  return (
    <div className='bg-white mt-8'>
        <h1 className='text-blue-500 font-bold m-2 text-xl'>KOF GESTHOTEL</h1>
        <div className='flex gap-2 p-2 pb-4'>
            <div className='flex-1'>
                <h1 className='font-bold text-slate-900'>Destinations phares</h1>
                <ol className='text-sm flex flex-col gap-3'>
                    <li className='text-blue-500 hover:underline cursor-pointer hover:opacity-90'><a>Togo: Hotel 2 février</a></li>
                    <li className='text-blue-500 hover:underline cursor-pointer hover:opacity-90'><a>Bénin: Hotel merveille</a></li>
                    <li className='text-blue-500 hover:underline cursor-pointer hover:opacity-90'><a>RDC: Hotel notre bonheur</a></li>
                    <li className='text-blue-500 hover:underline cursor-pointer hover:opacity-90'><a>Ghana: Tucks Hotel</a></li>
                </ol>
            </div>
            <div className='flex-1'>
                <h1 className='font-bold text-slate-900'>Pays et régions principaux</h1>
                <ol className='text-sm flex flex-col gap-3'>
                    <li className='text-blue-500 hover:underline cursor-pointer hover:opacity-90'><a>Togo</a></li>
                    <li className='text-blue-500 hover:underline cursor-pointer hover:opacity-90'><a>Bénin</a></li>
                    <li className='text-blue-500 hover:underline cursor-pointer hover:opacity-90'><a>RDC</a></li>
                    <li className='text-blue-500 hover:underline cursor-pointer hover:opacity-90'><a>Ghana</a></li>
                </ol>
            </div>
            <div className='flex-1'>
                
                <h1 className='font-bold text-slate-900'>Assistance et FAQ</h1>
                <ol className='text-sm flex flex-col gap-3'>
                    <li className='text-blue-500 hover:underline cursor-pointer hover:opacity-90'><a>Vos réservations</a></li>
                    <li className='text-blue-500 hover:underline cursor-pointer hover:opacity-90'><a>FAQ</a></li>
                    <li className='text-blue-500 hover:underline cursor-pointer hover:opacity-90'><a>Nous contacter</a></li>
                </ol>
            </div>
            <div className='flex-1'>
                <h1 className='font-bold text-slate-900'>Autres informations</h1>
                <ol className='text-sm flex flex-col gap-3'>
                    <li className='text-blue-500 hover:underline cursor-pointer hover:opacity-90'><a>Qui sommes-nous ?</a></li>
                    <li className='text-blue-500 hover:underline cursor-pointer hover:opacity-90'><a>Conditions générales d'utilisation</a></li>
                    <li className='text-blue-500 hover:underline cursor-pointer hover:opacity-90'><a>Politiques sur la protection des données</a></li>
                    <li className='text-blue-500 hover:underline cursor-pointer hover:opacity-90'><a>Mentions légales</a></li>
                </ol>
            </div>
        </div>
    </div>
  )
}
