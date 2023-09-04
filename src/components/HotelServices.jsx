import React from 'react'
import Icon from './Icon'

export default function HotelServices({hotel}) {
  return (
    <div className='p-2  border border-b-0 border-l-0 border-r-0 rounded-md bg-white'>
      <h1 className='text-2xl font-bold text-slate-900'>Nos services</h1>
      <div className='grid grid-cols-2 mt-2 gap-4'>
      {hotel?.services?.map((item,index)=>{
          return(
            <div key={index} className='flex items-center gap-2 text-sm text-slate-900 opacity-70'>
            <Icon name={item?.icon} style={{}} />
            <p>{item?.nom}</p>
        </div>
          )
        })}
      </div>
    </div>
  )
}
