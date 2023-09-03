import React from 'react'
import logo from "../images/logo.png";
import { useNavigate } from 'react-router-dom';
import Icon from "./Icon";
export default function Nav() {
    const navigate=useNavigate()
    const go_home=()=>{
        navigate("/fr");
    }
  return (
    <div className="bg-white p-2 border border-t-0 border-l-0 border-r-0 flex items-center justify-between">
        <div className='w-[60px] h-[60px] hover:opacity-70 cursor-pointer' onClick={go_home}>
         <img src={logo} className='w-[60px] h-[60px] rounded-full object-contain' />
        </div>

        <nav className='flex items-center gap-14'>
            <button className='font-semibold text-blue-500 text-base hover:text-blue-900 flex items-center gap-1'>
               <Icon name="arrow-redo-outline" style={{color:"gray",fontSize:"20px"}}/>
                Publier votre annonce</button>
            <button className='font-semibold text-blue-500 text-base hover:text-blue-900 flex items-center gap-1'>
            <Icon name="umbrella-outline" style={{color:"gray",fontSize:"20px"}}/>
                Assistance</button>
            <button 
            className='font-semibold text-blue-500 text-base hover:text-blue-900 flex items-center gap-1'>
                <Icon name="person-outline" style={{color:"gray",fontSize:"20px"}}/>
                Se connecter</button>
        </nav>
        
    </div>
  )
}
