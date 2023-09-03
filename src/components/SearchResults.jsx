import React from 'react'
import Icon from './Icon'
import ResultItem from './ResultItem'
import { useNavigate } from 'react-router-dom'

export default function SearchResults() {
    const navigate=useNavigate();
    const filtres=[
        {id:1,title:"Piscine"},
        {id:2,title:"Petit-dejeuner inclus"},
        {id:3,title:"Hôtel"},
        {id:4,title:"Vue sur la mer"},
        {id:5,title:"Appartement"}
    ]

    const notes=[
        {id:1,title:"Tout afficher"},
        {id:2,title:"Merveilleux 9+"},
        {id:3,title:"Très bien 8+"},
        {id:4,title:"Bien 7+"},
    ]

    const etoiles=[
        {id:1,title:"1"},
        {id:2,title:"2"},
        {id:3,title:"3"},
        {id:4,title:"4"},
        {id:5,title:"5"},
    ]

    const type_hebergement=[
        {id:1,title:"Villa"},
        {id:2,title:"Location de vacances"},
        {id:3,title:"Appart' hôtel"},
        {id:4,title:"Maison d'hôtes"},
        {id:5,title:"Hôtel"},
        {id:6,title:"Appartement"},
    ]

    const quartiers=[
        {id:1,title:"Lomé"},
        {id:2,title:"Nyekonakpoé"},
        {id:3,title:"Agbalé Pédo"},
        {id:4,title:"Kodjovya"},
        {id:5,title:"Sagbado"},
    ]

    const go_to_hotel_details=(hotel)=>{
        navigate("/details/1");
    }
  return (
    <div>
        <div className='bg-blue-900 p-4 m-2 rounded-lg '>
            <div className='text-white flex items-center gap-4'>
                <div className='w-[50px] h-[50px] rounded-full bg-white flex items-center justify-center'>
                    <Icon name="notifications-outline" style={{color:"black",fontSize:"30px"}} />
                </div>
                <p className='flex-1 font-bold text-lg'>Connectez-vous et économisez en moyenne 15 % sur des milliers d'hôtels</p>
            </div>
            <button className='m-4 mb-0 bg-blue-500 text-white p-4 rounded-full font-bold text-sm w-[150px] flex items-center justify-center hover:opacity-90 shadow-lg'>Se connecter</button>
        </div>

        <div className='flex gap-4 m-2'>
            <div className='w-[250px] bg-white p-1'>
                <h1 className='font-bold text-slate-900 text-lg mb-4'>Filtrer par</h1>
                <h2 className='font-semibold text-md'>Filtres populaires</h2>
                {filtres?.map((filtre,index)=>{
                    return(
                        <button className='flex items-center gap-2 text-sm p-1 mb-1 hover:bg-gray-100' key={index}>
                         <Icon  name="square-outline" style={{fontSize:"18px"}}/>
                        <p>{filtre?.title}</p>
                        </button>
                    )
                })}

                <h2 className='font-semibold text-md mt-2'>Prix total</h2>
                <div className='m-2'>
                <div className='flex items-center justify-between'>
                    <p>0 €</p>
                    <p>3000 € +</p>
                </div>
                <input type="range" min="1" max="100" className='w-[100%]' />
                </div>

                <h2 className='font-semibold text-md mt-2'>Note des clients</h2>
                <div className='m-2'>
                {notes?.map((filtre,index)=>{
                    return(
                        <button className='flex items-center gap-2 text-sm p-1 mb-1 hover:bg-gray-100' key={index}>
                         <Icon  name="ellipse-outline" style={{fontSize:"18px"}}/>
                        <p>{filtre?.title}</p>
                        </button>
                    )
                })}
                </div>

                <h2 className='font-semibold text-md mt-2'>Nombre d'étoiles</h2>
                <div className='m-2 grid grid-cols-4 gap-2'>
                {etoiles?.map((filtre,index)=>{
                    return(
                        <button className='flex items-center justify-center gap-2 text-sm p-1 mb-1 border shadow-lg text-xs hover:bg-gray-100' key={index}>
                         <p>{filtre?.title}</p>
                         <Icon  name="star" style={{fontSize:"15px"}}/>
                        </button>
                    )
                })}
                </div>

                <h2 className='font-semibold text-md mt-2'>Type d'hébergement</h2>
                <div className='m-2'>
                {type_hebergement?.map((filtre,index)=>{
                    return(
                        <button className='flex items-center gap-2 text-sm p-1 mb-1 hover:bg-gray-100' key={index}>
                         <Icon  name="square-outline" style={{fontSize:"18px"}}/>
                        <p>{filtre?.title}</p>
                        </button>
                    )
                })}
                </div>

                <h2 className='font-semibold text-md mt-2'>Quartier</h2>
                <div className='m-2'>
                {quartiers?.map((filtre,index)=>{
                    return(
                        <button className='flex items-center gap-2 text-sm p-1 mb-1 hover:bg-gray-100' key={index}>
                         <Icon  name="ellipse-outline" style={{fontSize:"18px"}}/>
                        <p>{filtre?.title}</p>
                        </button>
                    )
                })}
                </div>
                
            </div>
            <div className='flex-1'>
                <p className='text-sm '>43 hébergements</p>
                <div>
                    {new Array(4).fill(7).map((x,index)=>{
                        return(
                            <ResultItem item={x} key={index} index={index} go_to_hotel_details={go_to_hotel_details}/>
                        )
                    })}
                </div>
            </div>
        </div>
    </div>
  )
}
