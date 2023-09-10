import React, { useContext, useState } from 'react'
import { AuthContext } from '../MyContext'
import { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Home = () => {
const [events,setEvents]=useState([])
const[page,setCounter]=useState(1)
const[order,setOrder]=useState("1")
const[name,setName]=useState("")
const {state}=useContext(AuthContext)
// useEffect(()=>{
//     async function getProducts() {
//     const response =await axios.get("http://localhost:8000/all-events")  
//     if(response.data.success){
//     setEvents(response.data.events)
//     }
//     }
//     getProducts()
//     },[])

useEffect(()=>{
    async function paginate() {
    const response =await axios.post("http://localhost:8000/all-events",{page,order,name}) 
    if(response.data.success){
    setEvents(response.data.events)
    }
    }
    paginate()
    },[page,order,name])

  return (
    <div>
       <h1>Home</h1>
      <h3 style={{textAlign:"center",color:"grey",marginTop:"15px"}}>{state?.user?.name}</h3>
      <div>
      <h2 style={{marginLeft:"20px",marginTop:"20px"}}>Events</h2>
      <input type="text" onChange={(e)=>setName(e.target.value)} placeholder='Search Event' style={{padding:"5px 10px",marginTop:"10px"}}/>
      {
        events?.length ?
      <div>
      {    
            events?.map((product)=>(
            <div key={product?._id} style={{margin:"20px",boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",width:"20%",padding:"10px"}}>
             {/* <img src={product?.image} alt="" style={{width:"100%",height:"300px"}} onClick={()=>router(`/single-product/${product?._id}`)}/> */}
             <h3>{product?.name}</h3>
             <h4>{product?.date} Rs.</h4>
                </div>
            ))
      }
      </div>:
      <p style={{marginLeft:"20px",marginTop:"20px"}}>No Events</p>
      }
      <button onClick={()=>setCounter(page+1)}>Next page</button>
<div>
    <span>Sort:</span>
      <select onChange={(e)=>setOrder(e.target.value)} style={{padding:"3px 10px"}}>
     <option value="1">Ascend</option>
     <option value="-1">Descend</option>
      </select>
      </div>
      
    </div>
    </div>
  )
}

export default Home
