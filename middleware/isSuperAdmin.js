import userModel from "../models/userModel.js";

// Define a function to generate a random 6-digit OTP
export const isSuperAdmin = async(email) => {
   try {
    const isSuper=await userModel.findOne({email:email})
    if(isSuper?.isSuperAdmin){
        return true
    }
    else{
        return false
    }
   } catch (error) {
    return false
   }
  };
  
