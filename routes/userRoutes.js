import express from "express"
import {  accessTokenFromRefresh, deleteUser, getAllUsers, loginController, registerController, resetPasswordAfterVerification, sendOtp, testing, verifyOtp,updateAdminProfile,getAdminByEmail } from "../controller/userController/userController.js";
import { isLogedIn } from "../middleware/isLogedIn.js";
import  { ForgetDataValidate, loginDataValidate, newPasswordDataValidate, otpDataValidate, registerDataValidate }  from '../validation/loginDataValidate.js'
import { isSuperAdmin } from "../middleware/isSuperAdmin.js";


const userRouter=express.Router();


userRouter.post('/test',isLogedIn,testing)
userRouter.post('/login',loginDataValidate,loginController)
userRouter.post('/register',registerDataValidate,registerController)
userRouter.post('/forgetPassword',ForgetDataValidate,sendOtp)
userRouter.post('/verifyOtp',otpDataValidate,verifyOtp)
userRouter.post('/changePassword',newPasswordDataValidate,resetPasswordAfterVerification)
userRouter.post('/getAccessFromRefresh',accessTokenFromRefresh)
userRouter.get('/getAllUsers',isLogedIn,getAllUsers)
userRouter.delete('/deleteAdmin',isLogedIn,isSuperAdmin,deleteUser)
userRouter.post('/updateAdminProfile', isLogedIn, isSuperAdmin, updateAdminProfile);
userRouter.get('/getAdminByEmail/:email', isLogedIn, isSuperAdmin, getAdminByEmail);




export default userRouter;
