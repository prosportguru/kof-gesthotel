import React from 'react'

export default function OffreNav({page,set_page}) {

  return (
    <div className='flex items-center justify-between bg-white rounded-md shadow-lg'>
        <div className='flex items-center gap-4 '>
            <button 
            className={`text-sm p-2 ${page==1?'text-red-600 font-bold':'text-slate-900'} `} 
            style={{borderBottom:page==1?"2px solid red":''}}
            onClick={set_page.bind(this,1)}
            >
                Présentation
            </button>

            <button 
            className={`text-sm p-2 ${page==2?'text-red-600 font-bold':'text-slate-900'} `} 
            style={{borderBottom:page==2?"2px solid red":''}}
            onClick={set_page.bind(this,2)}
            >
                Chambres
            </button>
            <button 
            className={`hidden text-sm p-2 ${page==3?'text-red-600 font-bold':'text-slate-900'} `} 
            style={{borderBottom:page==3?"2px solid red":''}}
            onClick={set_page.bind(this,3)}
            >
                Emplacement
            </button>
            <button 
            className={`text-sm p-2 ${page==4?'text-red-600 font-bold':'text-slate-900'} `} 
            style={{borderBottom:page==4?"2px solid red":''}}
            onClick={set_page.bind(this,4)}
            >
                Equipements
            </button>

            <button 
            className={`text-sm p-2 ${page==5?'text-red-600 font-bold':'text-slate-900'} `} 
            style={{borderBottom:page==5?"2px solid red":''}}
            onClick={set_page.bind(this,5)}
            >
                Services
            </button>

        </div>

        <div>
            <button 
            onClick={set_page.bind(this,2)}
            className='bg-blue-500 p-2 mr-2 font-bold text-white rounded-md text-xs flex items-center justify-center shadow-lg hover:shadow-none'>Réservre une chambre</button>
        </div>
        
    </div>
  )
}
