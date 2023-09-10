import Event from '../Models/eventModel.js'

export const queryEvents=async(req,res)=>{
try{
// const{page=1,limit=2,name,sort='date'}=req.body;
const{page,limit=1,name}=req.body.page;
const query={}
if(name){
query.name={$regex:name,$options:"i"}
}
// const sortPrefix=sort[0]=='-'? '-':''
// const sortFields=sort.replace('/^-/',"")
// const sortOption={[sortFields]:`${sortPrefix}1`}

const skip=(parseInt(page)-1)-parseInt(limit)
const limitValue=parseInt(limit)

// const events=await Event.find(query).sort(sortOption).skip(skip).limit(limitValue).lean()
const events=await Event.find(query).skip(skip).limit(limitValue)
return res.status(200).json({eventss:events})
}
catch(error){
console.log(error,"error")
return res.status(500).json({message:"Internal Server Error"})
}
}