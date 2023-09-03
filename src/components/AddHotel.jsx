import React, { useEffect, useState } from 'react'
import ActivityIndicator from './ActivityIndicator'
import { db } from '../firebase_file'
import Icon from './Icon'

export default function AddHotel({close,load_data,selected}) {
    const [pays,set_pays]=useState("")
    const [region,set_region]=useState("")
    const [ville,set_ville]=useState("")
    const [quartier,set_quartier]=useState("")

    const [nom,set_nom]=useState("")
    const [star,set_star]=useState("")
    const [detail,set_detail]=useState("")
    const [note,set_note]=useState(0.0)
    const [equipements,set_equipements]=useState([])
    const [services,set_services]=useState([])
    const [gerant,set_gerant]=useState("")
    const [images,set_images]=useState([])
    const [carte,set_carte]=useState("")
    const [addresse,set_addresse]=useState("");
   
    const [sending,set_sending]=useState(false)
    const [users,set_users]=useState(null)
    const [data_equipements,set_data_equipements]=useState(null)
    const [data_services,set_data_services]=useState(null);

    useEffect(()=>{
        load_users()
        load_equipements()
        load_services()
    },[])
    useEffect(()=>{
        if(selected==null) return;
        set_pays(selected?.pays)
        set_region(selected?.region)
        set_ville(selected?.ville)
        set_quartier(selected?.quartier)
        
    },[selected])

    const load_users=async ()=>{
        const snap=await db.collection("users").orderBy("username","asc").get()
        let d=[]
        snap.docs.map((doc)=>{
            let id=doc.id;
            let dt=doc.data()
            dt.key=id;
            d.push(dt)
        })
        set_users(d)
    }

    const load_equipements=async()=>{
        const snap=await db.collection("equipements").orderBy("nom","asc").get()
        let d=[]
        snap.docs.map((doc)=>{
            let id=doc.id;
            let dt=doc.data()
            dt.key=id;
            d.push(dt)
        })
        set_data_equipements(d)
    }
    const load_services=async ()=>{
        const snap=await db.collection("services").orderBy("nom","asc").get()
        let d=[]
        snap.docs.map((doc)=>{
            let id=doc.id;
            let dt=doc.data()
            dt.key=id;
            d.push(dt)
        })
        set_data_services(d)
    }

    const valider=async ()=>{
       
       if(pays==""){
        alert("Le pays est vide");
        return;
       }
       if(region==""){
        alert("La région est vide");
        return;
       }
       if(ville==""){
        alert("La ville est vide");
        return;
       }
       if(quartier==""){
        alert("Le quartier est vide");
        return;
       }
       
       set_sending(true)

       const line={
       pays,region,ville,quartier
       }
       if(selected==null){
            await db.collection("hotels").add(line)
       }else{
        await db.collection("hotels").doc(selected?.key).update(line,{merge:true})
       }

       
       await load_data()
       close()
    }

    const add_input_file_field=()=>{
        let zone=document.querySelector("#zone_input");
        let input=document.createElement("input")
        input.type="file"
        input.classList.add("file","flex-1")

        let btn=document.createElement("button")
        btn.classList.add("border", "p-1", "flex", "items-center", "justify-center")
        btn.innerHTML="X"
        btn.addEventListener("click",()=>{remove_file_input(div)})
        let div=document.createElement("div")
        div.classList.add("flex","items-center","gap-2")
        div.appendChild(input)
        div.appendChild(btn)

        zone.appendChild(div)
    }

    const remove_file_input=(input)=>{
        console.log("going to remove",input)
    }

  return (
    <div className='w-[600px] text-xs'>
        <div className='bg-slate-900 text-white  p-2'>
            <strong>Ajouter un hôtel</strong>
        </div>
        <div className='p-2 grid grid-cols-3 gap-2'>
             
            <div className='flex flex-col mb-2'>
                <strong>Nom</strong>
                <input 
                value={nom}
                onChange={e=>set_nom(e.target.value)}
                type="text" className='border outline-none bg-gray-100 p-2 rounded-md shadow-lg hover:shadow-none'/>
            </div>

            <div className='flex flex-col mb-2'>
                <strong>Etoiles</strong>
                <select 
                value={star}
                onChange={e=>set_star(e.target.value)}
                type="text" className='border outline-none bg-gray-100 p-2 rounded-md shadow-lg hover:shadow-none'>
                    <option value=""></option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </div>

            <div className='flex flex-col mb-2'>
                <strong>Note initial (sur 10)</strong>
                <input 
                value={note}
                onChange={e=>set_note(e.target.value)}
                min={0.0}
                max={10.0}
                step={0.1}
                type="number" className='border outline-none bg-gray-100 p-2 rounded-md shadow-lg hover:shadow-none' />
                   
            </div>

            <div className='flex flex-col mb-2'>
                <strong>Gérant de l'hôtel</strong>
                <select 
                value={gerant}
                onChange={e=>set_gerant(e.target.value)}
                type="text" className='border outline-none bg-gray-100 p-2 rounded-md shadow-lg hover:shadow-none'>
                    <option value=""></option>
                    {users?.map((user)=>{
                        if(user?.type==1) return null;
                        return(
                            <option value={user?.key}>{user?.username}</option>
                        )
                    })}
                </select>
                   
            </div>

            <div className='flex flex-col mb-2'>
                <strong>Adresse ou localisation</strong>
                <input 
                value={addresse}
                onChange={e=>set_addresse(e.target.value)}
                className='border outline-none bg-gray-100 p-2 rounded-md shadow-lg hover:shadow-none' />
                   
            </div>

            <div className='flex flex-col mb-2'>
                <strong>Image sur Google Map</strong>
                <input 
                type="file"
                id="carte"
                className='border outline-none bg-gray-100 p-2 rounded-md shadow-lg hover:shadow-none' />
                   
            </div>
            
        </div>

        <div className='p-2 grid grid-cols-2 gap-2'>
            <div className='border border-l-0 border-t-0 border-b-0 pr-1'>
                <strong>Equipements</strong>
                <div className='grid grid-cols-2'>
                    {data_equipements?.map((item)=>{
                        return(
                            <div key={item?.key} className='flex items-center gap-2 text-[10px] mt-1 cursor-pointer'>
                                <Icon name="square-outline" />
                                <p>{item?.nom}</p>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className='border border-l-0 border-t-0 border-b-0 pr-1'>
                <strong>Services</strong>
                <div className='grid grid-cols-2'>
                    {data_services?.map((item)=>{
                        return(
                            <div key={item?.key} className='flex items-center gap-2 text-[10px] mt-1 cursor-pointer'>
                                <Icon name="square-outline" />
                                <p>{item?.nom}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>

        <div className='flex flex-col p-2'>
            <strong>Description de l'hôtel</strong>
            <textarea 
            value={detail}
            onChange={e=>set_detail(e.target.value)}
            className='border outline-none bg-gray-100 p-2 rounded-md shadow-lg hover:shadow-none'
            />
        </div>

        <div className='p-2'>
            <div className='flex items-center gap-2'>
                <strong>Bannières de l'hôtels</strong>
                <button
                onClick={add_input_file_field}
                className='border p-1 flex items-center justify-center shadow-lg hover:shadow-none rounded-sm'>
                    <Icon name="add" style={{fontSize:"15px",color:"black"}} />
                </button>
            </div>
            <div id='zone_input' className='grid grid-cols-2 gap-2'>

            </div>
            
        </div>

        <div className='flex flex-col mb-2 mt-4 items-center justify-center'>
                <button 
                disabled={sending}
                onClick={valider}
                className='bg-slate-900  text-white p-2 w-[100px] rounded-md shadow-lg hover:shadow-none flex items-center justify-center'>
                    {sending==true ? <ActivityIndicator />:"Valider"}
                </button>
            </div>
    </div>
  )
}
