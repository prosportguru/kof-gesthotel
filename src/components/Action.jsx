import React from 'react'
import Icon from './Icon'

export default function Action({action,click}) {
  return (
    <div 
    onClick={click}
    className='w-[150px] h-[100px] bg-white p-2 rounded-md shadow-lg hover:shadow-none cursor-pointer flex flex-col items-center justify-center'>
        <Icon name={action?.icon} style={{color:action?.color,fontSize:"40px"}}/>
        <p className='text-sm text-slate-900'>{action?.title}</p>
    </div>
  )
}
