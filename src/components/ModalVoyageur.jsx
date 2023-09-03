import React from 'react'
import Icon from './Icon'

export default function ModalVoyageur() {
  return (
    <div className='w-[400px] text-slate-900 p-2 flex items-center justify-around pt-5'>
        <div className='flex flex-col items-center gap-2'>
            <strong>Chambre</strong>
            <div className='flex items-center gap-2'>
                <button className='border p-2 flex items-center justify-center rounded-md shadow-lg hover:shadow-none'>
                    <Icon name="remove" /></button>
                <p>1</p>
                <button className='border p-2 flex items-center justify-center rounded-md shadow-lg hover:shadow-none'>
                    <Icon name="add" /></button>
            </div>
        </div>

        <div className='flex flex-col  items-center gap-2'>
            <strong>Personne</strong>
            <div className='flex items-center gap-2'>
                <button className='border p-2 flex items-center justify-center rounded-md shadow-lg hover:shadow-none'>
                    <Icon name="remove" /></button>
                <p>2</p>
                <button className='border p-2 flex items-center justify-center rounded-md shadow-lg hover:shadow-none'>
                    <Icon name="add" /></button>
            </div>
        </div>
    </div>
  )
}
