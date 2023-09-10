import mongoose from "mongoose";

const eventSchema=new mongoose.Schema({
name:{
type:String,
required:true
},
creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
},
date:{
type:Date,
default:Date.now(),
// required:true
}
})
 export default mongoose.model("Event",eventSchema)