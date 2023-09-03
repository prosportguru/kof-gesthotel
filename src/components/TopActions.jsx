import React from 'react'
import Icon from './Icon'

export default function TopActions({back,searchText,title,topComponent}) {
  return (
    <div className='flex w-[100%] items-center justify-between pb-2 mb-2' 
    style={{borderBottom:"1px solid gray"}}
    >
        <div className='flex items-center gap-2'>
            <button 
            onClick={back}
            className='shadow shadow-lg cursor-pointer hover:opacity-60 flex items-center gap-2 bg-transparent border-none p-1 rounded-md'>
                <Icon name="arrow-back-outline" style={{fontSize:"24px",color:"black"}}/>
            </button>
            <h2 className="text-slate-900 text-sm">{title}</h2>
        </div>
        {topComponent}
    
    <div className='hidden flex items-center gap-1 w-[300px] bg-gray-100 p-1 rounded-md shadow shadow-lg hover:opacity-60'>
        <Icon name="search-outline" style={{fontSize:"20px",color:"black"}} />
        <input type="text" placeholder={searchText} className='text-black flex-1 p-2  border-none outline-none text-xs bg-transparent'/>
    </div>

    <div className='hidden'>
        <button className="text-black flex items-center justify-center gap-1 bg-transparent border-none p-3 w-[100px] rounded-md shadow shadow-lg hover:opacity-60  cursor-pointer">
            <Icon name="add-outline" style={{color:"black",fontSize:"20px"}}/>
            Add
        </button>
    </div>
</div>
  )
}
