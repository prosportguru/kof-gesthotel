import React, { useState } from 'react'
import Icon from './Icon';
import ActivityIndicator from './ActivityIndicator';

export default function Destination({index,item,del,set_open_update}) {
    const [deleting,set_deleting]=useState(false)
    let bg="";
    if(index%2==0){
        bg="bg-gray-100"
    }
    
  return (
    <tr className={`${bg} hover:opacity-70`}>
        <td align='center' className='p-2 pl-0 pr-0'>{index+1}</td>
        <td>{item?.pays}</td>
        <td>{item?.region}</td>
        <td>{item?.ville}</td>
        <td>{item?.quartier}</td>
        <td align='center' width={"10%"}>
            <div className='flex items-center justify-center gap-2'>
            <button 
            onClick={set_open_update}
            className='border border-slate-900 p-1 flex items-center justify-center rounded-sm shadow-md hover:shadow-none'>
                <Icon name="create-outline" />
            </button>
            <button
            disabled={deleting}
            onClick={del.bind(this,item,set_deleting)}
            className='border border-slate-900 p-1 flex items-center justify-center rounded-sm shadow-md hover:shadow-none'>
                {deleting==true ? <ActivityIndicator />:<Icon name="close-outline" />}
            </button>
            </div>
        </td>
    </tr>
  )
}
