import React, { useEffect, useState } from 'react'
import TopActions from './TopActions'
import ActivityIndicator from './ActivityIndicator'
import { db } from '../firebase_file';
import User from './User';
import Icon from './Icon';
import Client from './Client';
import Service from "./Service"

const TopComponent=({search,set_search})=>{
    
    return(
        <div className='flex items-center gap-4'>
            <div className='bg-gray-100 w-[200px] p-1 rounded-md shadow-lg hover:shadow-none '>
                <Icon name="search-outline" />
                <input 
                value={search}
                onChange={e=>set_search(e.target.value)}
                type="text" className='p-1 bg-transparent border-none outline-none' placeholder='Rerchercher'/>
            </div>
            <button className='bg-slate-900  text-white p-2 flex items-center justify-center shadow-lg hover:shadow-none rounded-md'>
                <Icon name="add" style={{color:"white",fontSize:"15px"}}/>
            </button>
        </div>
    )
}

export default function Services({back,action}) {
    const [data,set_data]=useState(null);
    const [data_show,set_data_show]=useState(null)
    const [search,set_search]=useState("")
    
    useEffect(()=>{
        load_data();   
    },[])

    useEffect(()=>{
        if(search==""){
            set_data_show(data)
            return;
        }
        let s=search?.toLocaleLowerCase() ?? ''
        const res=data?.filter((x)=>{
            return x?.username?.toLocaleLowerCase().includes(s) || x?.email?.toLocaleLowerCase().includes(s)
        }) ?? []
        set_data_show(res)
    },[search])

   

    const load_data=async ()=>{
        const snap=await db.collection("clients").get();
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
    <div className='m-auto mt-[16px] h-[calc(100vh-16px-100px)]  flex flex-col items-center bg-white w-[80%] rounded-md p-2 text-xs'>
        <TopActions
        title={action?.title} 
        searchText="Search players"
        back={back}
        topComponent={<TopComponent search={search} set_search={set_search}/>}
        />
        <div className='text-black h-[calc(100vh-16px-60px-50px)] overflow-auto w-[100%]'>
            {data_show==null && <ActivityIndicator />}
            {data_show!=null && data_show?.length==0 && <p className="text-sm font-gray-400 text-center">Aucune information n'est trouvée</p>}
           {data_show!=null && data_show?.length>0 && <div>
            <table width={"100%"} className='border'>
                <thead>
                    <tr className='bg-slate-900 text-white'>
                        <th className='p-2 pl-0 pr-0'>N°</th>
                        <th className='text-left'>Type</th>
                        <th className='text-left'>Utilisateur</th>
                        <th className='text-left'>Email</th>
                        <th className='text-left'>Mot de passe</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody className=''>
                    {data_show?.map((item,index)=>{
                        return(
                            <Service item={item} index={index} key={index}/>
                        )
                    })}
                </tbody>
            </table>
            </div>}
        </div>
    </div>
  )
}
