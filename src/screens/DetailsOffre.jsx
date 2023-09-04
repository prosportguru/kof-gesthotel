import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import SearchBox from '../components/SearchBox'
import Banner from '../components/Banner'
import Avantages from '../components/Avantages'
import LastOffers from '../components/LastOffers'
import Footer from '../components/Footer'
import SearchResults from '../components/SearchResults'
import OffreImages from '../components/OffreImages'
import OffreNav from '../components/OffreNav'
import HotelPresentation from '../components/HotelPresentation'
import HotelChambres from '../components/HotelChambres'
import HotelEmplacement from '../components/HotelEmplacement'
import HotelEquipements from '../components/HotelEquipements'

import HotelServices from '../components/HotelServices'
import { useParams } from 'react-router-dom'
import { db } from '../firebase_file'

export default function DetailsOffre() {
    const [page,set_page]=useState(1);
    const [hotel,set_hotel]=useState(null)

    const {id}=useParams()
    
    useEffect(()=>{
      load_hotel()
    },[id])

    const load_hotel=async ()=>{
      if(id==undefined) return;
      const doc=await db.collection("hotels").doc(id).get()
      if(doc.exists){
        console.log("exist")
      }else{
        console.log("it does not exits",id)
      }
      let dt=doc.data()
      dt.key=id;
      set_hotel(dt)
    }


  return (
    <div className='bg-slate-50 min-h-[100vh]'>
        <Nav />
        <div className="w-[80%] m-auto mt-4 min-h-[300px]">
          <OffreImages  hotel={hotel}/>
          <OffreNav page={page} set_page={set_page}/>
          {page==1 && <HotelPresentation hotel={hotel}/>}
          {page==2 && <HotelChambres hotel={hotel}/>}
          {page==3 && <HotelEmplacement />}
          {page==4 && <HotelEquipements hotel={hotel}/>}
          {page==5 && <HotelServices hotel={hotel}/>}
        </div>
        
       
        <Footer />
    </div>
  )
}
