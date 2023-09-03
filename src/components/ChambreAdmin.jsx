import React, { useState } from 'react'
import Icon from './Icon';
import ActivityIndicator from './ActivityIndicator';

export default function ChambreAdmin({index,item,del,set_open_update,hotels}) {
    const [deleting,set_deleting]=useState(false)
    
    let bg="";
    if(index%2==0){
        bg="bg-gray-100"
    }

    let res=hotels?.filter((x)=>{
        return x.key==item?.hotel
    }) ?? []
    let hotel=""
    if(res?.length>0){
        hotel=res[0].nom
    }
  return (
    <tr className={`${bg} hover:opacity-70`}>
        <td align='center' className='p-2 pl-0 pr-0'>{index+1}</td>
       
        <td>{hotel}</td>
        <td>{item?.dimension}</td>
        <td>{item?.nom}</td>
        <td align='center'>{item?.prix_par_nuit}</td>
        <td align='center'>{item?.nb_personnes}</td>
        
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
