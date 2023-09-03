import React, { useEffect, useState } from 'react'
import Icon from './Icon';

export default function Modal({content,close}) {
    const [show,set_show]=useState(false)
    useEffect(()=>{
        if(show==true){
            return ;
        }


        setTimeout(()=>{
            var dialog = document.getElementById("myDialog");
            if(!dialog.hasAttribute("open")){
                dialog.showModal();
                set_show(true)
            }
            
        },10)
        
    },[])

    const close_dialog=()=>{
        close();
        var dialog = document.getElementById("myDialog");
        dialog.close();
    }
  return (
    <dialog id="myDialog" className="m-auto p-0 pb-1 shadow-2xl shadow-black min-h-[100px] rounded-md">
        {content}
        <div className="flex items-center justify-center">
            <button onClick={close_dialog}
            className="absolute top-1.5 right-2  bg-red-900  w-[20px] h-[20px] hover:opacity-80 text-red-500 flex flex-col items-center justify-center  rounded-full"
            >
                <Icon name="close-outline" style={{color:"white"}} />
              
            </button>
        </div>
        
    </dialog>
  )
}
