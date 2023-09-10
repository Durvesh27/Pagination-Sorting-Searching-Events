import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import { Login, Register, getCurrentUser } from './Controllers/userControllers.js'
import { allEvents, createEvent } from './Controllers/eventControllers.js'
import {queryEvents} from './Controllers/queryControllers.js'
const app=express()
dotenv.config()
app.use(express.json())
app.use(cors())
app.get("/",(req,res)=>{
res.send("Code running")
})

// app.use('/api/user',userRoutes)
app.post("/register",Register)
app.post("/login",Login)
app.post("/getCurrentUser", getCurrentUser);
app.post("/create-event",createEvent)
app.post("/paginate",queryEvents)
app.post("/all-events",allEvents)

mongoose.connect(process.env.MONGO_URL).then(()=>{
console.log("Connected to DB")
})

app.listen(8000,()=>{
console.log("Server running on port 8000")
})