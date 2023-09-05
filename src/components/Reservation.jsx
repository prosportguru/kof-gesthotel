import React from 'react'
import Icon from './Icon';
import moment from 'moment';
export default function Reservation({index,item}) {
    let bg="";
    if(index%2==0){
        bg="bg-gray-100"
    }
    let str_type="";
    if(item?.type==1){
        str_type="Super Admin"
    }else if(item?.type==2){
        str_type="Admin"
    }
    let date=moment(item?.date?.seconds*1000).format("ll");
  return (
    <tr className={`${bg} hover:opacity-70`}>
        <td align='center' className='p-2 pl-0 pr-0'>{index+1}</td>
        <td>{date}</td>
        <td>{item?.hotel?.nom}</td>
        <td>{item?.nom}</td>
        <td>{item?.nom_contact}</td>
        <td>{item?.telephone_contact}</td>
        <td>{item?.email_contact}</td>
        <td align='center' width={"10%"} className='hidden'>
            <div className='flex items-center justify-center gap-2'>
            <button className='border border-slate-900 p-1 flex items-center justify-center rounded-sm shadow-md hover:shadow-none'>
                <Icon name="create-outline" />
            </button>
            <button className='border border-slate-900 p-1 flex items-center justify-center rounded-sm shadow-md hover:shadow-none'>
                <Icon name="close-outline" />
            </button>
            </div>
        </td>
    </tr>
  )
}
