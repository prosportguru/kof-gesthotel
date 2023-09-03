import React from 'react'
import Icon from './Icon';
import ActivityIndicator from './ActivityIndicator';

export default function User({index,item,del}) {
    const [deleting,set_deleting]=useState(false)
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
  return (
    <tr className={`${bg} hover:opacity-70`}>
        <td align='center' className='p-2 pl-0 pr-0'>{index+1}</td>
        <td>{str_type}</td>
        <td>{item?.username}</td>
        <td>{item?.email}</td>
        <td>{item?.password}</td>
        <td align='center' width={"10%"}>
            <div className='flex items-center justify-center gap-2'>
            <button className='border border-slate-900 p-1 flex items-center justify-center rounded-sm shadow-md hover:shadow-none'>
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
