import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import SearchBox from '../components/SearchBox'
import Banner from '../components/Banner'
import Avantages from '../components/Avantages'
import LastOffers from '../components/LastOffers'
import Footer from '../components/Footer'
import Hotels from '../components/Hotels'
import { auth } from '../firebase_file'

export default function Home() {
  const [connected,set_connected]=useState(false)
  useEffect(()=>{
    auth?.onAuthStateChanged((user)=>{
      if(user==null){
        set_connected(false)
      }else{
        set_connected(true)
      }
    })
  },[])
  return (
    <div className='bg-slate-50 min-h-[100vh]'>
        <Nav connected={connected}/>
        <div className='w-[90%] m-auto'>
        <SearchBox  connected={connected}/>
        <Hotels  connected={connected}/>
        <Banner  connected={connected}/>
        <LastOffers  connected={connected}/>
        <Avantages  connected={connected}/>
        </div>
        
        <Footer  connected={connected}/>
    </div>
  )
}
