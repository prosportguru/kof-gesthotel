import React, { useEffect, useState } from 'react'
import Icon from './Icon'
import ResultItem from './ResultItem'
import { useNavigate } from 'react-router-dom'
import { db } from '../firebase_file';
import ActivityIndicator from './ActivityIndicator';

export default function SearchResults({state}) {
    const navigate=useNavigate();
    const [equipements,set_equipements]=useState(null);
    const [services,set_services]=useState(null)
    const [quartiers,set_quartiers]=useState(null)
    const [chambres,set_chambres]=useState(null)
    const [hotels,set_hotels]=useState(null)
    const [selected_equipements,set_selected_equipements]=useState([])
    const [selected_services,set_selected_services]=useState([])
    const [prix,set_prix]=useState(10)
    const [star,set_star]=useState(0)


    const {dst,arrive,depart,voyageur}=state;
    let {pays,region,ville,quartier}=dst;
    pays=pays?.toLowerCase()
    region=region?.toLowerCase()
    ville=ville?.toLowerCase()
    quartier=quartier?.toLowerCase()


    useEffect(()=>{
        load_filtre()

        load_data();
    },[state,selected_equipements,selected_services,prix,star])

    const load_filtre=async ()=>{
        set_chambres(null)
        const snap=await db.collection("equipements").orderBy("nom","asc").get()
        let d=[]
        snap.docs.map((doc)=>{
            let id=doc.id;
            let dt=doc.data()
            dt.key=id;
            d.push(dt)
        })
        set_equipements(d)

        const snap2=await db.collection("services").orderBy("nom","asc").get()
        let d2=[]
        snap2.docs.map((doc)=>{
            let id=doc.id;
            let dt=doc.data()
            dt.key=id;
            d2.push(dt)
        })
        set_services(d2)

        const snap3=await db.collection("destinations").get()
        let d3=[]
        snap3.docs.map((doc)=>{
            let id=doc.id;
            let dt=doc.data()
            dt.key=id;

            d3.push({id,title:dt.quartier})
        })
        set_quartiers(d3)

        const snap4=await db.collection("hotels").get()
        let d4=[]
        snap4.docs.map((doc)=>{
            let id=doc.id;
            let dt=doc.data()
            dt.key=id;
            d4.push(dt)
        })
        set_hotels(d4)

        const snap5=await db.collection("chambres").get()
        let d5=[]
        snap5.docs.map((doc)=>{
            let id=doc.id;
            let dt=doc.data()
            dt.key=id;
            

            const hotel=hotels?.filter((a)=>{
                return a.key==dt.hotel;
            })[0] ?? null;

            let p=hotel?.pays?.toLowerCase() 
            let r=hotel?.region?.toLowerCase();
            let v=hotel?.ville?.toLowerCase();
            let q=hotel?.quartier?.toLowerCase();
            let etoile=parseInt(hotel?.star)

            let show=pays.includes(p) && region?.includes(r) && ville?.includes(v)
            if(show==true){
                if(star!=0){
                    if(star==etoile){
                        d5.push(dt)
                    }
                }else{
                    d5.push(dt)
                }
                
            }

            
        })

        if(selected_equipements?.length>0){
            d5=d5.filter((x)=>{
                let e=x.equipements ?? []
                if(e?.length==0) return false;
                let my_keys=e?.map((s)=>{
                    return s.key;
                }) ?? []
                let _in=true;
                selected_equipements?.map((a)=>{
                    let key=a.key;
                    if(my_keys?.indexOf(key)<0){
                        _in=false;
                    }
                })

                return _in;
            })
        }

        if(selected_services?.length>0){
            d5=d5.filter((x)=>{
                let e=x.services ?? []
                if(e?.length==0) return false;
                let my_keys=e?.map((s)=>{
                    return s.key;
                }) ?? []
                let _in=true;
                selected_services?.map((a)=>{
                    let key=a.key;
                    if(my_keys?.indexOf(key)<0){
                        _in=false;
                    }
                })

                return _in;
            })
        }

        d5=d5?.filter((x)=>{
            let ppn=parseFloat(x.prix_par_nuit)
            return ppn==prix;
        })

        if(star!=0){
            d5=d5?.filter((x)=>{
                let ppn=parseFloat(x.prix_par_nuit)
                return ppn==prix;
            })
        }
        set_chambres(d5)
    }
    const load_data=async ()=>{}
    

    const notes=[
        {id:1,title:"Tout afficher"},
        {id:9,title:"Merveilleux 9+"},
        {id:8,title:"Très bien 8+"},
        {id:7,title:"Bien 7+"},
    ]

    const etoiles=[
        {id:1,title:"1"},
        {id:2,title:"2"},
        {id:3,title:"3"},
        {id:4,title:"4"},
        {id:5,title:"5"},
    ]

   

    const go_to_hotel_details=(hotel)=>{
        navigate("/details/"+hotel?.key);
    }

    const add_remove_equipements=(item)=>{
        let nse=selected_equipements?.length==0 ? [] :[...selected_equipements]
        const _in=(nse?.filter((x)=>{
            return x.key==item?.key
        }) ?? [])?.length==1
        
        if(_in){
            nse=nse?.filter((x)=>{
                return x.key!=item?.key
            }) ?? []
        }else{
            nse.push(item)
        }
        set_selected_equipements(nse)
        
    }

    const add_remove_services=(item)=>{
        let nse=selected_services?.length==0 ? [] :[...selected_services]
        const _in=(nse?.filter((x)=>{
            return x.key==item?.key
        }) ?? [])?.length==1
        
        if(_in){
            nse=nse?.filter((x)=>{
                return x.key!=item?.key
            }) ?? []
        }else{
            nse.push(item)
        }
        set_selected_services(nse)
        
    }


  return (
    <div>
        <div className='bg-blue-900 p-4 m-2 rounded-lg '>
            <div className='text-white flex items-center gap-4'>
                <div className='w-[50px] h-[50px] rounded-full bg-white flex items-center justify-center'>
                    <Icon name="notifications-outline" style={{color:"black",fontSize:"30px"}} />
                </div>
                <p className='flex-1 font-bold text-lg'>Connectez-vous et économisez en moyenne 15 % sur des milliers d'hôtels</p>
            </div>
            <button className='m-4 mb-0 bg-blue-500 text-white p-4 rounded-full font-bold text-sm w-[150px] flex items-center justify-center hover:opacity-90 shadow-lg'>Se connecter</button>
        </div>

        <div className='flex gap-4 m-2'>
            <div className='w-[250px] bg-white p-1'>
                <h1 className='font-bold text-slate-900 text-lg mb-4'>Filtrer par</h1>
                <h2 className='font-semibold text-md'>Equipements</h2>
                {equipements?.map((filtre,index)=>{
                    let _in=selected_equipements?.filter((x)=>{
                        return x.key==filtre?.key;
                    }) ?? []
                    return(
                        <button 
                        onClick={add_remove_equipements.bind(this,filtre)}
                        className='flex items-center gap-2 text-sm p-1 mb-1 hover:bg-gray-100' key={index}>
                         {_in?.length>0 ? <Icon  name="square" style={{fontSize:"18px"}}/>:<Icon  name="square-outline" style={{fontSize:"18px"}}/>}
                        <p className='text-xs text-left'>{filtre?.nom}</p>
                        </button>
                    )
                })}

                <h2 className='font-semibold text-md mt-4'>Services</h2>
                {services?.map((filtre,index)=>{
                    let _in=selected_services?.filter((x)=>{
                        return x.key==filtre?.key;
                    }) ?? []
                    return(
                        <button
                        onClick={add_remove_services.bind(this,filtre)}
                        className='flex items-center gap-2 text-sm p-1 mb-1 hover:bg-gray-100' key={index}>
                          {_in?.length>0 ? <Icon  name="square" style={{fontSize:"18px"}}/>:<Icon  name="square-outline" style={{fontSize:"18px"}}/>}
                        <p className='text-xs text-left'>{filtre?.nom}</p>
                        </button>
                    )
                })}

                <h2 className='font-semibold text-md mt-4'>Prix total</h2>
                <div className='m-2'>
                <div className='flex items-center justify-between'>
                    <p>0 €</p>
                    <p>{prix}</p>
                    <p>100 € +</p>
                </div>
                <input 
                value={prix} 
                onChange={e=>set_prix(e.target.value)}
                type="range" min="1" max="100" className='w-[100%]' />
                </div>

                <h2 className='font-semibold text-md mt-4 hidden'>Note des clients</h2>
                <div className='m-2 hidden'>
                {notes?.map((filtre,index)=>{
                    return(
                        <button className='flex items-center gap-2 text-sm p-1 mb-1 hover:bg-gray-100' key={index}>
                         <Icon  name="ellipse-outline" style={{fontSize:"18px"}}/>
                        <p className='text-xs text-left'>{filtre?.title}</p>
                        </button>
                    )
                })}
                </div>

                <h2 className='font-semibold text-md mt-4'>Nombre d'étoiles</h2>
                <div className='m-2 grid grid-cols-4 gap-2'>
                {etoiles?.map((filtre,index)=>{
                    let bg=""
                    if(filtre.id<=star){
                        bg="bg-blue-500"
                    }
                    return(
                        <button 
                        onClick={e=>set_star(filtre.id)}
                        className={`${bg} flex items-center justify-center gap-2 text-sm p-1 mb-1 border shadow-lg text-xs hover:bg-gray-100`}
                         key={index}>
                         <p className='text-left text-xs'>{filtre?.title}</p>
                         <Icon  name="star" style={{fontSize:"15px"}}/>
                        </button>
                    )
                })}
                </div>

                {/*<h2 className='font-semibold text-md mt-2'>Type d'hébergement</h2>
                <div className='m-2'>
                {type_hebergement?.map((filtre,index)=>{
                    return(
                        <button className='flex items-center gap-2 text-sm p-1 mb-1 hover:bg-gray-100' key={index}>
                         <Icon  name="square-outline" style={{fontSize:"18px"}}/>
                        <p>{filtre?.title}</p>
                        </button>
                    )
                })}
                </div>*/}

                <h2 className='font-semibold text-md mt-2 hidden'>Quartier</h2>
                <div className='m-2 hidden'>
                {quartiers?.map((filtre,index)=>{
                    return(
                        <button className='flex items-center gap-2 text-sm p-1 mb-1 hover:bg-gray-100' key={index}>
                         <Icon  name="ellipse-outline" style={{fontSize:"18px"}}/>
                        <p>{filtre?.title}</p>
                        </button>
                    )
                })}
                </div>
                
            </div>
            <div className='flex-1'>
                <p className='text-sm '>{chambres?.length ?? 0} hébergements</p>
                {chambres==null && <ActivityIndicator />}
                {chambres!=null && chambres?.length==0 && <p className='text-sm'>Aucun hébergement trouvé</p>}
                <div className='mt-1'>
                    {chambres?.map((x,index)=>{
                        const hotel=hotels?.filter((a)=>{
                            return a.key==x.hotel;
                        })[0] ?? null;
                        return(
                            <ResultItem state={state} notes={notes} item={x} key={index} index={index} go_to_hotel_details={go_to_hotel_details} hotel={hotel}/>
                        )
                    })}
                </div>
            </div>
        </div>
    </div>
  )
}
