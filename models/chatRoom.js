import mongoose from "mongoose";

const chatRoomModelSchema=new mongoose.Schema({
    createdBy: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"user" 
    },
    createdFor: {
       type :mongoose.Schema.Types.ObjectId,
        ref:"user" 
    },
    lastMessage:{
        type:String,
        default:"null"
    }}
   ,
{
    timestamps:true
})

const chatRoomModel=mongoose.model("chatroom",chatRoomModelSchema)
export default chatRoomModel;