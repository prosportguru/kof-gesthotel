import React, { useEffect, useState } from 'react'
import Icon from './Icon'
import { useNavigate } from 'react-router-dom'
import Modal from "./Modal";
import ModalDestination from './ModalDestination';
import ModalVoyageur from './ModalVoyageur';

export default function SearchBox({show_title,state}) {
    const [open_dst,set_open_dst]=useState(false)
    const [open_voyageur,set_open_voyageur]=useState(false)
    const [dst,set_dst]=useState(null);
    const [voyageur,set_voyageur]=useState(null)
    const [arrive,set_arrive]=useState("")
    const [depart,set_depart]=useState("");

    useEffect(()=>{
        if(state==undefined) return;
        set_dst(state.dst)
        set_arrive(state.arrive)
        set_depart(state.depart)
        set_voyageur(state.voyageur)
    },[state])


    const navigate=useNavigate()
    const go_to_search=()=>{
        if(dst==null){
            alert("vous devez choisir une destination");
            return;
        }
        if(arrive==""){
            alert("Vous devez préciser la date d'arrivée");
            return;
        }
        if(depart==""){
            alert("Vous devez préciser la date de depart");
            return;
        }

        if(voyageur==null){
            alert("Definissez l'option voyageurs");
            return;
        }

        
        navigate("/search",{state:{dst,depart,arrive,voyageur}});
    }

    const date_depart_clicked=()=>{
        let input=document.querySelector("#date_depart")
        input.focus()
        input.click();
       
    }
  return (
    <div className='m-2 text-xs'>
        {show_title==undefined && <h1 className='text-3xl text-slate-900 font-bold'>Où voulez-vous partir ?</h1>}
        <div className='flex gap-4 items-center mt-2'>
            <div 
            onClick={()=>set_open_dst(true)}
            className='flex-1 border border-slate-600 flex items-center gap-2 rounded-md bg-white shadow-lg p-1 cursor-pointer hover:opacity-70'>
                <Icon name="location" style={{color:"blue",fontSize:"24px"}} />
                <div className='flex flex-col'>
                    <h2 className='text-slate-900 font-semibold'>Destination</h2>
                    {dst==null && <p style={{color:"gray"}}>Définir une destination</p>}
                    {dst!=null && <p style={{color:"gray"}}>{dst?.ville}, Région{dst?.region}, {dst?.pays}</p>}
                </div>
            </div>
            
            <div 
            className='flex-1 border border-slate-600 flex items-center gap-2 rounded-md bg-white shadow-lg p-1 cursor-pointer hover:opacity-70'>
                <div className='flex flex-col  w-[100%]'>
                    <h2 className='text-slate-900 font-semibold'>Arrivée</h2>
                    <input 
                    value={arrive}
                    onChange={e=>set_arrive(e.target.value)}
                    type="date" className='text-gray-500 border-none outline-none bg-transparent' />
                </div>
            </div>

            <div className='flex-1 border border-slate-600 flex items-center gap-2 rounded-md bg-white shadow-lg p-1 cursor-pointer hover:opacity-70'>
                <div className='flex flex-col w-[100%]'>
                    <h2 className='text-slate-900 font-semibold'>Départ</h2>
                    <input 
                     value={depart}
                     onChange={e=>set_depart(e.target.value)}
                    type="date" className='text-gray-500 border-none outline-none bg-transparent' />
                </div>
            </div>
            <div 
            onClick={()=>set_open_voyageur(true)}
            className='flex-1 border border-slate-600 flex items-center gap-2 rounded-md bg-white shadow-lg p-1 cursor-pointer hover:opacity-70'>
                <Icon name="person" style={{color:"blue",fontSize:"24px"}} />
                <div className='flex flex-col'>
                    <h2 className='text-slate-900 font-semibold'>Voyageurs</h2>
                    {voyageur==null && <p style={{color:"gray"}}>0 personne, 0 chambre</p>}
                    {voyageur!=null && <p style={{color:"gray"}}>{voyageur?.personne} personnes, {voyageur.chambre} chambre</p>}
                </div>
            </div>
            <button 
            onClick={go_to_search}
            className='w-[150px] bg-blue-500 p-4 rounded-md border-none shadow-lg hover:opacity-70 text-white font-bold'>Rechercher</button>
        </div>

        {open_dst==true && <Modal 
        close={()=>set_open_dst(false)}
        content={<ModalDestination 
        close={()=>set_open_dst(false)}
        set_dst={set_dst}
        />}
        />}

        {open_voyageur==true && <Modal 
        close={()=>set_open_voyageur(false)}
        content={<ModalVoyageur 
        close={()=>set_open_voyageur(false)}
        set_voyageur={set_voyageur}
        voyageur={voyageur}
        />}
        />}
    </div>
  )
}
