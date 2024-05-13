import mongoose from "mongoose";

const userModelSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    isSuperAdmin:{
        type:Boolean,
        required:true,
    },
    refreshToken:{
        type:String,
        required:false,
    },
    createdBy:{
        type:String,
    }
},{
    timestamps:true
})

const userModel=mongoose.model("user",userModelSchema)
export default userModel;