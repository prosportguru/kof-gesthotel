import React, { useEffect, useState } from 'react'
import logo from "../images/logo.png"
import { auth, db } from '../firebase_file'
import { useNavigate } from 'react-router-dom'
import Login from '../components/Login'
import ActivityIndicator from '../components/ActivityIndicator'
import Action from '../components/Action'
import Icon from '../components/Icon'
import Users from '../components/Users'
import Clients from '../components/Clients'
import HotelsAdmin from '../components/HotelsAdmin'
import Equipements from '../components/Equipements'
import Services from '../components/Services'
import Destinations from '../components/Destinations'
import ChambresAdmin from '../components/ChambresAdmin'
import Reservations from '../components/Reservations'

const actions=[
    {id:1,title:"Utilisateurs",icon:"people-outline",color:"rgba(255,0,0,0.3)"},
    {id:2,title:"Clients",icon:"person-outline",color:"rgba(0,255,0.3)"},
    {id:3,title:"Hôtels",icon:"home-outline",color:"rgba(0,0,255,0.3)"},
    {id:4,title:"Equipements",icon:"briefcase-outline",color:"rgba(255,0,255,0.3)"},
    {id:5,title:"Services",icon:"basket-outline",color:"rgba(100,100,0,0.3)"},
    {id:6,title:"Destinations",icon:"location-outline",color:"rgba(100,0,100,0.3)"},
    {id:7,title:"Chambres",icon:"bed-outline",color:"rgba(10,20,30,0.3)"},
    {id:8,title:"Résevations",icon:"cart-outline",color:"rgba(100,200,300,0.3)"},
]

export default function Admin() {
    const navigate=useNavigate()
    const [loading,set_loading]=useState(true)
    const [loading_me,set_loading_me]=useState(false)
    const [connected,set_connected]=useState(false)
    const [me,set_me]=useState(null)
    const [loading_logout,set_loading_logout]=useState(false)
    const [search,set_search]=useState("")
    const [data,set_data]=useState(null);
    const [page,set_page]=useState(null)
    const [selected_action,set_selected_action]=useState(null)

    useEffect(()=>{
        set_data(actions)
    },[])

    useEffect(()=>{
        if(search==""){
            set_data(actions);
            return;
        }
        let s=search?.toLocaleLowerCase() ?? '';
        let res=actions?.filter((x)=>{
            return x.title?.toLocaleLowerCase().includes(s)
        }) ?? []
        set_data(res)

    },[search])

    useEffect(()=>{ 
        auth?.onAuthStateChanged((user)=>{
            if(user==null){
                console.log("user not connect")
                set_loading(false)
            }else{
                console.log("user connected",user?.email)
                set_connected(true)
                set_loading(false)
                load_me()
            }
        })
    },[auth])
    const load_me=async ()=>{
        set_loading_me(true)
        const snap=await db.collection("users").where("email","==",auth?.currentUser?.email).get();
        if(snap.docs.length==0){
            return;
        }
        let doc=snap.docs[0]
        let id=doc.id;
        let dt=doc.data()
        dt.key=id;
        set_me(dt)
        set_loading_me(false)
    }

    

    const logout=async ()=>{
        set_loading_logout(true)
        await auth?.signOut()
        set_loading_logout(false)
        window.location.href=""
    }

    const action_clicked=(action)=>{
        set_page(action.id);
    }

    const back=()=>{
        set_page(null)
    }
  return (
    <div className='bg-slate-50 h-[100vh] flex items-center  flex-col'>
        {loading==true && <img src={logo}  className='mt-16 w-[100px] h-[100px] rounded-full shadow-lg animate-pulse'/>}
        {loading==true && <p className='text-sm'>Chargement...</p>}
        {loading==false && connected==false && <Login />}
        {connected==true && <div className='mt-16'>
        {loading_me==true && <ActivityIndicator />}
        {loading_me==false && <div className={`${page!=null ? 'w-[100vw]':''}`}>
            <h1 className='text-center mb-2 text-slate-900 font-semibold'>Bonjour {me?.username},</h1>
            {page==null && <>
            <div className='text-xs w-[300px] m-auto mt-4 mb-2 bg-white p-1 flex items-center gap-2 rounded-md shadow-lg hover:shadow-none'>
                <Icon name="search-outline" style={{fontSize:"18px"}} />
                <input 
                value={search}
                onChange={e=>set_search(e.target.value)}
                type="text" placeholder='Rerchercher une action' className='p-2 flex-1 border-none outline-none' />
            </div>
            <div className='grid grid-cols-3 gap-4 '>
                {data?.map((action,index)=>{
                    return <Action action={action} key={action.id} click={()=>{
                        action_clicked(action)
                        set_selected_action(action)
                    }}  />
                })}
            </div>

            <div className='flex items-center justify-center mt-4'>
            <button className='text-red-500 text-xs hover:underline' 
            disabled={loading_logout}
            onClick={logout}
            >
                {loading_logout==true ? <ActivityIndicator />:"Se déconnecter"}
            </button>
            </div>
            </>}

            {page==1 && <Users back={back} action={selected_action}/>}
            {page==2 && <Clients back={back} action={selected_action}/>}
            {page==3 && <HotelsAdmin back={back} action={selected_action}/>}
            {page==4 && <Equipements back={back} action={selected_action}/>}
            {page==5 && <Services back={back} action={selected_action}/>}
            {page==6 && <Destinations back={back} action={selected_action}/>}
            {page==7 && <ChambresAdmin back={back} action={selected_action}/>}
            {page==8 && <Reservations back={back} action={selected_action}/>}
            </div>
        }
        </div>}
    </div>
  )
}
