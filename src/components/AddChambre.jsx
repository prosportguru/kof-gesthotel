import React, { useEffect, useState } from 'react'
import ActivityIndicator from './ActivityIndicator'
import { auth, db, storage } from '../firebase_file'
import Icon from './Icon'
import AddIcon from './AddIcon'
import Modal from './Modal'

export default function AddChambre({close,load_data,selected}) {
    
    const [nom,set_nom]=useState("")
    const [icon,set_icon]=useState("")
    const [open_icon,set_open_icon]=useState(false)
    const [equipements,set_equipements]=useState([])
    const [services,set_services]=useState([])
    const [hotel,set_hotel]=useState("")
    const [m2,set_m2]=useState("");
    const [prepaiement,set_prepaiement]=useState(1)
    const [prix_par_nuit,set_prix_par_nuit]=useState(10);
    const [nb_personnes,set_nb_personnes]=useState(1)
    const [nb_petit_lits,set_nb_petit_lits]=useState(0)
    const [nb_grand_lits,set_nb_grand_lits]=useState(1);
   
   
    const [sending,set_sending]=useState(false)

    const [data_equipements,set_data_equipements]=useState(null)
    const [data_services,set_data_services]=useState(null);
    const [data_pays,set_data_pays]=useState(null)
    const [data_hotels,set_data_hotels]=useState(null)

    useEffect(()=>{
        load_hotels()
    },[])

    useEffect(()=>{
        set_data_equipements([])
        set_data_services([])
        set_equipements([])
        set_services([])
        if(hotel=="") {
            return
        };
        let dt=data_hotels?.filter((x)=>{
            return x.key==hotel;
        }) ?? []
        if(dt?.length>0){
            set_data_equipements(dt[0].equipements)
            set_data_services(dt[0].services)
        }

    },[hotel])

    const load_hotels=async ()=>{
        const email=auth?.currentUser?.email;
        let su=await db.collection("users").where("email","==",email).get()
        if(su?.docs?.length==0) return;
        let doc=su.docs[0]
        let data=doc.data()
        let id_user=doc.id;
        let type=data.type; 
        let snap;
        if(type==1){
             snap=await db.collection("hotels").orderBy("nom","asc").get()
            console.log("ok we are here")
        }else{
             snap=await db.collection("hotels").where("gerant","==",id_user).orderBy("nom","asc").get()
        }
        
        let d=[]
        snap.docs.map((doc)=>{
            let id=doc.id;
            let dt=doc.data()
            dt.key=id;
            d.push(dt)
        })
        set_data_hotels(d)
    }
 

    useEffect(()=>{
        if(selected==null) return;
        
        set_nom(selected?.nom)
        set_hotel(selected?.hotel)
        set_nb_personnes(selected?.nb_personnes)
        set_nb_grand_lits(selected?.nb_grand_lits)
        set_nb_petit_lits(selected?.nb_petit_lits)
        set_m2(selected?.dimension ?? '')
        set_prepaiement(selected?.prepaiement)
        set_prix_par_nuit(selected?.prix_par_nuit)
        set_equipements(selected?.equipements)
        set_services(selected?.services)
        
    },[selected])

    const valider=async ()=>{
     
       if(hotel==""){
        alert("L'hôtel est vide");
        return;
       }
       if(nom==""){
        alert("Le nom est vide");
        return;
       }
       if(nb_personnes==""){
        alert("Le nombre de personne est vide")
        return;
       }
       if(m2==""){
        alert("La dimension de la chambre est vide");
        return;
       }

       const zone=document.querySelector("#zone_input")
       if(selected==null){
           if(zone.childNodes.length==0){
               alert("Vous devez joindre au moins une bannière");
               return;
           }
       }

       set_sending(true)

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
       
      
      
       

       const line={
       nom,
       hotel,
       nb_personnes,
       nb_grand_lits,
       nb_petit_lits,
       prepaiement,
       prix_par_nuit,
       equipements,
       services,
       banners,
       dimension:m2,
       }

       console.log(line)
       set_sending(false)
      
       if(selected==null){
            await db.collection("chambres").add(line)
       }else{
        await db.collection("chambres").doc(selected?.key).update(line,{merge:true})
       }

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

  return (
    <div className='w-[600px] text-xs'>
        <div className='bg-slate-900 text-white  p-2'>
            <strong>Ajouter une chambre</strong>
        </div>
        <div className='p-2'>
            
            <div className='grid grid-cols-2 gap-2'>
                <div className='flex flex-col  mb-2 flex-1'>
                    <strong>Hôtel</strong>
                    <select 
                    value={hotel}
                    onChange={e=>set_hotel(e.target.value)}
                   className='border outline-none bg-gray-100 p-2 rounded-md shadow-lg hover:shadow-none'>
                        <option value=""></option>
                        {data_hotels?.map((x,index)=>{
                            return(
                                <option value={x?.key} key={index}>{x?.nom}</option>
                            )
                        })}
                    </select>
                </div>

                <div className='flex flex-col  mb-2 flex-1'>
                    <strong>Dénomination de la chambre</strong>
                    <input 
                    placeholder='Chambre supérieur, vue jardin'
                    value={nom}
                    onChange={e=>set_nom(e.target.value)}
                    type="text" className='border outline-none bg-gray-100 p-2 rounded-md shadow-lg hover:shadow-none'/>
                </div>

                <div className='flex flex-col  mb-2 flex-1'>
                    <strong>Nombre de personnes</strong>
                    <input 
                    value={nb_personnes}
                    onChange={e=>set_nb_personnes(e.target.value)}
                    type="number" min={1} className='border outline-none bg-gray-100 p-2 rounded-md shadow-lg hover:shadow-none'/>
                </div>

                <div className='flex flex-col  mb-2 flex-1'>
                    <strong>Nombre de grand lit</strong>
                    <input 
                    value={nb_grand_lits}
                    onChange={e=>set_nb_grand_lits(e.target.value)}
                    type="number" min={0} className='border outline-none bg-gray-100 p-2 rounded-md shadow-lg hover:shadow-none'/>
                </div>
                <div className='flex flex-col  mb-2 flex-1'>
                    <strong>Nombre de petit lit</strong>
                    <input 
                    value={nb_petit_lits}
                    onChange={e=>set_nb_petit_lits(e.target.value)}
                    type="number" min={0} className='border outline-none bg-gray-100 p-2 rounded-md shadow-lg hover:shadow-none'/>
                </div>
                <div className='flex flex-col  mb-2 flex-1'>
                    <strong>Dimension de la chambre (m<sup>2</sup>)</strong>
                    <input 
                    value={m2}
                    onChange={e=>set_m2(e.target.value)}
                    type="number" min={0} 
                    className='border outline-none bg-gray-100 p-2 rounded-md shadow-lg hover:shadow-none'/>
                </div>

                <div className='flex flex-col  mb-2 flex-1'>
                    <strong>Prépaiement nécessaire</strong>
                    <select 
                     value={prepaiement}
                     onChange={e=>set_prepaiement(e.target.value)}
                    className='border outline-none bg-gray-100 p-2 rounded-md shadow-lg hover:shadow-none'>
                        <option value="1">Non</option>
                        <option value="2">Oui</option>
                    </select>
                </div>
                <div>
                    <div className='flex flex-col  mb-2 flex-1'>
                        <strong>Prix par nuit(€)</strong>
                        <input 
                        value={prix_par_nuit}
                        onChange={e=>set_prix_par_nuit(e.target.value)}
                        type="number" 
                        min={10}
                        step={5} 
                        className='border outline-none bg-gray-100 p-2 rounded-md shadow-lg hover:shadow-none'/>
                    </div>
                    
                </div>
                

            </div>
            <div className='grid grid-cols-2 gap-2'>

                <div className='flex flex-col  mb-2 flex-1 border border-l-0 border-t-0 border-b-0 pr-1 border-black'>
                    <strong>Equipements</strong>
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

                <div className='flex flex-col  mb-2 flex-1'>
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
           

            <div className='m-2'>
            <div className='flex items-center gap-2'>
                <strong>Images de la chambre</strong>
                <button
                onClick={add_input_file_field}
                className='border p-1 flex items-center justify-center shadow-lg hover:shadow-none rounded-sm'>
                    <Icon name="add" style={{fontSize:"15px",color:"black"}} />
                </button>
            </div>
            <div id='zone_input' className='grid grid-cols-2 gap-2'>

            </div>

            {selected!=null && selected?.banners?.length>0 && <div className='grid grid-cols-5 mt-2 gap-2 m-2'>
                {selected?.banners?.map((x,index)=>{
                    return <img src={x.url} className='w-[50px] h-[50px]' key={index}/>
                })}
            </div>}

            
            
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

        
    </div>
  )
}
