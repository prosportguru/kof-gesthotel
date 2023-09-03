import React from 'react'
import img4 from "../images/img4.png"
import img5 from "../images/img5.png"
import img6 from "../images/img6.png"
import img7 from "../images/img7.png"
import Icon from './Icon'

export default function ResultItem({item,index,go_to_hotel_details}) {
    const images=[img4,img5,img6,img7];
    let img=images[index]
  return (
    <div className='mb-4 flex gap-4 bg-white rounded-2xl shadow-lg cursor-pointer' onClick={go_to_hotel_details.bind(this,item)}>
        <div className='w-[300px]'>
            <img src={img} className='w-[100%] h-[250px] object-cover rounded-l-2xl' />
        </div>
        <div className='flex-1'>
            <h1 className='text-slate-900 font-semibold text-2xl'>Nom de l'hotel</h1>
            <div className='text-slate-900'>
                <Icon name="star" style={{}}/>
                <Icon name="star" style={{}}/>
                <Icon name="star" style={{}}/>
            </div>
            <div className='mt-2 flex items-center  gap-4 text-sm'>
                <div className='flex items-center gap-1'>
                    <Icon name="cafe" style={{fontSize:"20px"}} />
                    <p>Petit-dejeuner inclus</p>
                </div>

                <div className='flex items-center gap-1'>
                    <Icon name="wifi" style={{fontSize:"20px"}} />
                    <p>Wi-Fi inclus</p>
                </div>

                <div className='flex items-center gap-1'>
                    <Icon name="thunderstorm-outline" style={{fontSize:"20px"}} />
                    <p>Piscine</p>
                </div>
                
            </div>
            <div className='flex mt-4'>
                <div className='flex-1 flex items-center gap-1'>
                    <button className='bg-gray-200 p-2 rounded-md text-sm'>7,8</button>
                    <div className='flex flex-col  text-sm'>
                        <h1 className='font-bold text-slate-900'>Bien</h1>
                        <p>200 avis</p>
                    </div>
                </div>
                <div className='flex flex-col mr-2 items-end'>
                    <h1 className='font-bold text-slate-900 text-lg'>935 €</h1>
                    <p className='text-sm text-gray-500'>Pour 4 nuits</p>
                    <p className='text-sm text-gray-500'>234 € par nuit</p>
                </div>
            </div>
            <div className='mt-4 bg-yellow-500 flex items-center gap-2 w-[60%] text-sm p-2 rounded-xl text-white font-bold shadow-lg hover:shadow-none'>
                <Icon name="person-outline" />
                <button>Se connecter pour économiser plus</button>
            </div>
        </div>
    </div>
  )
}
