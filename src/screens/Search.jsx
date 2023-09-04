import React from 'react'
import Nav from '../components/Nav'
import SearchBox from '../components/SearchBox'
import Banner from '../components/Banner'
import Avantages from '../components/Avantages'
import LastOffers from '../components/LastOffers'
import Footer from '../components/Footer'
import SearchResults from '../components/SearchResults'
import { useLocation, useParams } from 'react-router-dom'

export default function Search() {
  const {state}=useLocation()
  const {dst,arrive,depart,voyageur}=state;


  return (
    <div className='bg-slate-50 min-h-[100vh]'>
        <Nav />
        <div className="w-[80%] m-auto mt-4 min-h-[300px]">
            <SearchBox show_title={false} state={state}/>
            <SearchResults  state={state}/>
        </div>
        
       
        <Footer />
    </div>
  )
}
