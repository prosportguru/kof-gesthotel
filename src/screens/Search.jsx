import React from 'react'
import Nav from '../components/Nav'
import SearchBox from '../components/SearchBox'
import Banner from '../components/Banner'
import Avantages from '../components/Avantages'
import LastOffers from '../components/LastOffers'
import Footer from '../components/Footer'
import SearchResults from '../components/SearchResults'

export default function Search() {
  return (
    <div className='bg-slate-50 min-h-[100vh]'>
        <Nav />
        <div className="w-[80%] m-auto mt-4 min-h-[300px]">
            <SearchBox show_title={false} />
            <SearchResults />
        </div>
        
       
        <Footer />
    </div>
  )
}
