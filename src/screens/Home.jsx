import React from 'react'
import Nav from '../components/Nav'
import SearchBox from '../components/SearchBox'
import Banner from '../components/Banner'
import Avantages from '../components/Avantages'
import LastOffers from '../components/LastOffers'
import Footer from '../components/Footer'
import Hotels from '../components/Hotels'

export default function Home() {
  return (
    <div className='bg-slate-50 min-h-[100vh]'>
        <Nav />
        <div className='w-[90%] m-auto'>
        <SearchBox />
        <Hotels />
        <Banner />
        <LastOffers />
        <Avantages />
        </div>
        
        <Footer />
    </div>
  )
}
