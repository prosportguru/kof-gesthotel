import React from 'react'
import Icon from './Icon'

export default function AddIcon({set_icon,close}) {
    let icons=["person","person-outline","people","car","bed","checkmark","wifi","location","planet","globe","ellipse","ellipse-outline","square","square-outline",
        "thunderstorm","thunderstorm-outline"]
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
