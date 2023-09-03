import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Splash from './screens/Splash'
import Home from './screens/Home'
import Search from './screens/Search'
import DetailsOffre from './screens/DetailsOffre'
import Admin from './screens/Admin'


function App() {
  

  return (
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path='/fr' element={<Home />} />
      <Route path='/search' element={<Search />} />
      <Route path='/details/:id' element={<DetailsOffre />}/>
      <Route path='/admin' element={<Admin />} />
    </Routes>
   </BrowserRouter>
  )
}

export default App
