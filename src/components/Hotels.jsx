import React from 'react'
import Hotel from './Hotel'
import { useNavigate } from 'react-router-dom'

export default function Hotels() {
    const navigate=useNavigate()
    const go_to_details_hotel=(hotel)=>{
        navigate("/details/1")
    }
  return (
    <div>
        <h1 className='text-lg text-slate-900 font-semibold opacity-80'>A la recherche de l'endroit parfait pour séjourner ?</h1>
        <p className='text-sm text-slate-900 opacity-70'>Les voyageurs ayant effectué des recherches similaires ont consulté ces hébergements.</p>
        <div className='grid grid-cols-4 gap-4 mt-4'>
            {new Array(4).fill(5).map((item,index)=>{
                return(
                    <Hotel item={item} index={index} key={index} go_to_details_hotel={go_to_details_hotel} />
                )
            })}
        </div>
    
    </div>
  )
}
