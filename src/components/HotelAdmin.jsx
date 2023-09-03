import React, { useEffect, useState } from 'react'
import Icon from './Icon';
import ActivityIndicator from './ActivityIndicator';
import { db } from '../firebase_file';

export default function HotelAdmin({index,item,del,set_open_update}) {
    const [deleting,set_deleting]=useState(false)
    const [gerant,set_gerant]=useState("-")

    useEffect(()=>{
        load_gerant()
    },[])

    const load_gerant=async ()=>{
        const doc=await db.collection("users").doc(item?.gerant).get();
        if(doc.exists){
            set_gerant(doc.data().username ?? '')
        }
    }
    let bg="";
    if(index%2==0){
        bg="bg-gray-100"
    }
    let n=parseInt(item?.star)
  return (
    <tr className={`${bg} hover:opacity-70`}>
        <td align='center' className='p-2 pl-0 pr-0'>{index+1}</td>
        <td>
            <div>
            <p>{item?.nom}</p>
            <div>
                {new Array(n).fill(n).map((x,index)=>{
                    return <Icon name="star" key={index} />
                })}
            </div>
        </div></td>
        <td>{item?.addresse}</td>
        <td>{gerant}</td>
        <td>{item?.note}/10</td>
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
