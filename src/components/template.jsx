import React, { useEffect, useState } from 'react'
import TopActions from './TopActions'
import ActivityIndicator from './ActivityIndicator'
import { db } from '../firebase_file';

export default function SportsLeagues({back,action}) {
    const [data,set_data]=useState(null);
    const [data_show,set_data_show]=useState(null)
    
    useEffect(()=>{
        load_data();   
    },[])

   

    const load_data=async ()=>{
        const snap=await db.collection("psg_sports").get();
        let d=[];
        snap.docs.map((doc)=>{
            let id=doc.id;
            let dt=doc.data()
            dt.key=id;
            d.push(dt)
        })
        set_data(d)
        set_data_show(d);

    }
  return (
    <div className='m-auto mt-[16px] h-[calc(100vh-16px-60px)]  flex flex-col items-center bg-white w-[80%] rounded-md p-2'>
        <TopActions
        title={action.title}
        searchText="Search players"
        back={back}
        />
        <div className='text-black h-[calc(100vh-16px-60px-50px)] overflow-auto w-[100%]'>
            {data_show==null && <ActivityIndicator />}
            {data_show!=null && data_show?.length==0 && <p className="text-sm font-gray-400 text-center">No data found</p>}
           {data_show!=null && data_show?.length>0 && <div>
            
            </div>}
        </div>
    </div>
  )
}
