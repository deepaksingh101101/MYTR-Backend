import mongoose from "mongoose";

const consentModelSchema=new mongoose.Schema({

    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    patientName:{
        type:String,
        required:true,
    },
    patientId:{
        type:String,
        required:true,
    },
    mobileNo:{
        type:String,
        required:true,
    },
    patientId:{
        type:String,
        required:true,
    },
    adharCard:{
        type:String,
        required:true,
    },
    gaurdianName:{
        type:String,
        required:true,
    },
    caseType:{
        type:String,
        required:true,
    },
    question:{
        type:String,
        required:true,
    },
    signatureUrl:{
        type:String,
        required:true,
    },
    VideoUrl:{
        type:String,
        required:true,
    }
},{
    timestamps:true
})

const consentModel=mongoose.model("consent",consentModelSchema)
export default consentModel;