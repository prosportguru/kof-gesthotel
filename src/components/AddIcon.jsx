import React from 'react'
import Icon from './Icon'

export default function AddIcon({set_icon,close}) {
    let icons=["person","person-outline","people","people-outline","car","car-outline","bed","bed-outline","checkmark","wifi","wifi-outline"
    ,"location","location-outline","planet","planet-outline","globe","globe-outline","ellipse","ellipse-outline","square","square-outline",
        "thunderstorm","thunderstorm-outline","rose","rose-outline","paw","paw-outline"]
  return (
    <div className='z-10  grid grid-cols-6 gap-2 h-[100px] overflow-auto '>
        {icons?.map((item)=>{
            return(
                <button key={item} className='border p-1' onClick={()=>{set_icon(item);close()}}>
                    <Icon name={item} style={{color:"black"}} /></button>
            )
        })}
    </div>
  )
}
