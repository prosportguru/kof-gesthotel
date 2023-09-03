import React, { useState } from 'react'
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

export default function DetailsOffre() {
    const [page,set_page]=useState(1);

  return (
    <div className='bg-slate-50 min-h-[100vh]'>
        <Nav />
        <div className="w-[80%] m-auto mt-4 min-h-[300px]">
          <OffreImages />
          <OffreNav page={page} set_page={set_page}/>
          {page==1 && <HotelPresentation />}
          {page==2 && <HotelChambres />}
          {page==3 && <HotelEmplacement />}
          {page==4 && <HotelEquipements />}
          {page==5 && <HotelServices />}
        </div>
        
       
        <Footer />
    </div>
  )
}
