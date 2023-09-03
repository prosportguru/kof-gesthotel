import React, { useEffect, useState } from 'react'
import ActivityIndicator from './ActivityIndicator'
import { db, storage } from '../firebase_file'
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
    const [data_pays,set_data_pays]=useState(null)

    useEffect(()=>{
        load_users()
        load_equipements()
        load_services()
        load_pays()
    },[])
    useEffect(()=>{
        if(selected==null) return;
        set_pays(selected?.pays ?? '')
        set_nom(selected?.nom ?? '')
        set_star(selected?.star)
        set_note(selected?.note)
        set_gerant(selected?.gerant);
        set_addresse(selected?.addresse)
        set_equipements(selected?.equipements)
        set_services(selected?.services)
        set_detail(selected.detail)

       
        
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

    const load_pays=async ()=>{
        const snap=await db.collection("destinations").orderBy("pays","asc").get()
        let d=[]
        snap.docs.map((doc)=>{
            let id=doc.id;
            let dt=doc.data()
            dt.key=id;
            d.push(dt.pays)
        })
        if(d.length>0){
            d=new Set(d)
            d=[...d]
        }
        
        set_data_pays(d)
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
       
       if(nom==""){
        alert("Le nom est vide");
        return;
       }
       if(star==""){
        alert("Vous devez définir le nombre d'étoiles de l'hôtel");
        return;
       }
       if(detail==""){
        alert("La description est vide");
        return;
       }

       if(gerant==""){
        alert("Le gérant de l'hôtel n'est pas défini");
        return;
       }
       if(addresse==""){
        alert("L'addresse est vide");
        return;
       }

       
       const files=document.querySelector("#carte").files;
       if(selected==null){
            if(files?.length==0){
                alert("Vous devez joindre une image Google Map");
                return;
            }
        }

        const zone=document.querySelector("#zone_input")
        if(selected==null){
            if(zone.childNodes.length==0){
                alert("Vous devez joindre au moins une bannière");
                return;
            }
        }

        let banners=selected?.banners ?? []
        if(zone.childNodes.length>0){
            const z_files=document.querySelectorAll(".file");
           const b= await new Promise((resolve,reject)=>{
                upload_banners(z_files,resolve,[])
            }) ?? []

            if(b?.length>0){
                b?.map((x)=>{
                    banners.push({main:false,url:x})
                })
            }
            
        }


        set_sending(true)
        let map=selected?.map ?? ""
        if(files?.length>0){
            let file=files[0];
            const ref=storage.ref("images/"+file.name)
            await ref.put(file)
            map=await ref.getDownloadURL();
        }

        let line={
            nom,
            star,
            note,
            gerant,
            addresse,
            map,
            equipements,
            services,
            detail,
            banners
        }

        console.log(line);
        if(selected==null){
            await db.collection("hotels").add(line)
        }else{
            await db.collection("hotels").doc(selected?.key).update(line,{merge:true})
        }
        set_sending(false)
        
       
       await load_data()
       close()
    }

    const upload_banners=async (data,resolve,banners)=>{
        if(data?.length==0){
            resolve(banners)
            return
        }
        let new_data=[...data]
        let new_banners=banners?.length==0 ? []:[...banners]
        let line=new_data.shift()
        let files=line.files;
        if(files?.length>0){
            const file=files[0]
            const ref=storage.ref("images/"+file.name);
            await ref.put(file)
            const url=await ref.getDownloadURL();
            new_banners.push(url)
        }

        upload_banners(new_data,resolve,new_banners)
        
    }

    const add_input_file_field=()=>{
        let zone=document.querySelector("#zone_input");
        let input=document.createElement("input")
        input.type="file"
        input.classList.add("file","flex-1")

        let btn=document.createElement("button")
        btn.classList.add("hidden","border", "p-1", "flex", "items-center", "justify-center")
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

    const handle_equipements=(item)=>{
        console.log(equipements)
        let new_items=equipements?.length>0 ? [...equipements] : []
        let res=new_items?.filter((x)=>{
            return x.key==item?.key;
        })
        if(res?.length==0){
            new_items.push(item)
        }else{
            new_items=new_items?.filter((x)=>{
                return x.key!=item?.key
            }) ?? []
        }
        set_equipements(new_items)
    }

    const handle_services=(item)=>{
        
        let new_items=services?.length>0 ? [...services] : []
        let res=new_items?.filter((x)=>{
            return x.key==item?.key;
        })
        if(res?.length==0){
            new_items.push(item)
        }else{
            new_items=new_items?.filter((x)=>{
                return x.key!=item?.key
            }) ?? []
        }
        set_services(new_items)
    }


  return (
    <div className='w-[600px] text-xs'>
        <div className='bg-slate-900 text-white  p-2'>
            <strong>Ajouter un hôtel</strong>
        </div>
        <div className='m-2 grid grid-cols-3 gap-2'>
             
            <div className='flex flex-col mb-2'>
                <strong>Nom</strong>
                <input 
                value={nom}
                onChange={e=>set_nom(e.target.value)}
                type="text" className='border outline-none bg-gray-100 p-2 rounded-md shadow-lg hover:shadow-none'/>
            </div>

            <div className='flex flex-col mb-2'>
                <strong>Pays</strong>
                <select 
                value={pays}
                onChange={e=>set_pays(e.target.value)}
                type="text" className='border outline-none bg-gray-100 p-2 rounded-md shadow-lg hover:shadow-none'>
                    <option value=""></option>
                    {data_pays?.map((x,index)=>{
                        return(
                            <option value={x} key={index}>{x}</option>
                        )
                    })}
                </select>
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

                {selected!=null && selected?.map!=undefined && <div className='mt-1'>
                    <img src={selected?.map} className='w-[50px] h-[50px] shadow-lg hover:shadow-none rounded-md '/>
                    </div>}
                   
            </div>
            
        </div>

        <div className='m-2 grid grid-cols-2 gap-2'>
            <div className='border border-l-0 border-t-0 border-b-0 pr-1 border-black'>
                <strong>Equipements {equipements?.length}</strong>
                <div className='grid grid-cols-2'>
                    {data_equipements?.map((item)=>{
                        let _in=(equipements?.filter((x)=>{return x.key==item.key}) ?? []).length>0
                        return(
                            <div key={item?.key} className='flex items-center gap-2 text-[10px] mt-1 cursor-pointer' 
                            onClick={handle_equipements.bind(this,item)}>
                                {_in==true ? <Icon name="square" />:<Icon name="square-outline" />}
                                <p>{item?.nom}</p>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className=''>
                <strong>Services</strong>
                <div className='grid grid-cols-2'>
                    {data_services?.map((item)=>{
                        let _in=(services?.filter((x)=>{return x.key==item.key}) ?? []).length>0
                        return(
                            <div key={item?.key} className='flex items-center gap-2 text-[10px] mt-1 cursor-pointer'
                            onClick={handle_services.bind(this,item)}
                            >
                                {_in==true ? <Icon name="square" />:<Icon name="square-outline" />}
                                <p>{item?.nom}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>

        <div className='flex flex-col m-2'>
            <strong>Description de l'hôtel</strong>
            <textarea 
            value={detail}
            onChange={e=>set_detail(e.target.value)}
            className='border outline-none bg-gray-100 p-2 rounded-md shadow-lg hover:shadow-none '
            />
        </div>

        <div className='m-2'>
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
        {selected!=null && selected?.banners?.length>0 && <div className='grid grid-cols-5 mt-2 gap-2 m-2'>
                {selected?.banners?.map((x,index)=>{
                    return <img src={x.url} className='w-[50px] h-[50px]' key={index}/>
                })}
            </div>}

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
