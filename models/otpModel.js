import mongoose from "mongoose";

const otpModelSchema=new mongoose.Schema({

    email:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true,
    },
    isVerified:{
        type:Boolean,
        default:false,
    }
},{
    timestamps:true
})

const otpModel=mongoose.model("otp",otpModelSchema)
export default otpModel;