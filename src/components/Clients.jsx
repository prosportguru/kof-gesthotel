import React, { useEffect, useState } from 'react'
import TopActions from './TopActions'
import ActivityIndicator from './ActivityIndicator'
import { db } from '../firebase_file';
import User from './User';
import Icon from './Icon';
import Modal from "./Modal"
import AddUser from './AddUser';
import Client from "./Client";
import AddClient from './AddClient';

const TopComponent=({search,set_search,set_open})=>{
    
    return(
        <div className='flex items-center gap-4'>
            <div className='bg-gray-100 w-[200px] p-1 rounded-md shadow-lg hover:shadow-none '>
                <Icon name="search-outline" />
                <input 
                value={search}
                onChange={e=>set_search(e.target.value)}
                type="text" className='p-1 bg-transparent border-none outline-none' placeholder='Rerchercher'/>
            </div>
            <button 
            onClick={set_open.bind(this,true)}
            className='bg-slate-900  text-white p-2 flex items-center justify-center shadow-lg hover:shadow-none rounded-md'>
                <Icon name="add" style={{color:"white",fontSize:"15px"}}/>
            </button>
        </div>
    )
}

export default function Clients({back,action}) {
    const [data,set_data]=useState(null);
    const [data_show,set_data_show]=useState(null)
    const [search,set_search]=useState("")
    const [open,set_open]=useState(false);
    const [open_update,set_open_update]=useState(false)
    const [selected,set_selected]=useState(null)
    
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
    
    const del=async (item,set_deleting)=>{
        
        set_deleting(true)
        await db.collection("client").doc(item?.key).delete()
        await load_data()
        set_deleting(false)
    }
    
    const update=(item)=>{

    }
  return (
    <div className='m-auto mt-[16px] h-[calc(100vh-16px-100px)]  flex flex-col items-center bg-white w-[80%] rounded-md p-2 text-xs'>
        <TopActions
        title={action?.title} 
        searchText="Search players"
        back={back}
        topComponent={<TopComponent search={search} set_search={set_search} set_open={set_open}/>}
        />
        <div className='text-black h-[calc(100vh-16px-60px-50px)] overflow-auto w-[100%]'>
            {data_show==null && <ActivityIndicator />}
            {data_show!=null && data_show?.length==0 && <p className="text-sm font-gray-400 text-center">Aucune information n'est trouvée</p>}
           {data_show!=null && data_show?.length>0 && <div>
            <table width={"100%"} className='border'>
                <thead>
                    <tr className='bg-slate-900 text-white'>
                        <th className='p-2 pl-0 pr-0'>N°</th>
                        <th className='text-left'>Client</th>
                        <th className='text-left'>Email</th>
                        <th className='text-left'>Mot de passe</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody className=''>
                    {data_show?.map((item,index)=>{
                        return(
                            <Client item={item} index={index} key={index}  del={del} set_open_update={()=>{
                                set_selected(item)
                                set_open_update(true)
                            }}/>
                        )
                    })}
                </tbody>
            </table>
            </div>}
        </div>

        {open==true && <Modal 
            close={()=>{set_open(false)}}
            content={<AddClient 
            close={()=>set_open(false)}
            load_data={load_data}
            />}
        />}

        {open_update==true && <Modal 
            close={()=>{set_open_update(false);set_selected(null)}}
            content={<AddClient 
            close={()=>{set_open_update(false);set_selected(null)}}
            load_data={load_data}
            selected={selected}
            />}
        />}
    </div>
  )
}
