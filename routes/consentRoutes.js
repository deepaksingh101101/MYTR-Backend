import express from "express"
import { isLogedIn } from "../middleware/isLogedIn.js";
import { upload } from "../middleware/multer.js";
import { deleteConsentById, findConsentById, getAllConsent, saveConsentFormData, updateConsentById, uploadImage, uploadVideo } from "../controller/consentController/consentController.js";
import { consentFormValidate, consentUpdateFormValidate } from "../validation/consentFormValidate.js";



const consentRouter=express.Router();



consentRouter.post('/submitConsent',isLogedIn,consentFormValidate,saveConsentFormData)
consentRouter.get('/getAllConsent',isLogedIn,getAllConsent)
consentRouter.delete('/consentById',isLogedIn,deleteConsentById)
consentRouter.get('/consentById',isLogedIn,findConsentById)
consentRouter.patch('/consentById',isLogedIn,consentUpdateFormValidate,updateConsentById)




consentRouter.post('/uploadImage',uploadImage)
consentRouter.post('/uploadVideo',uploadVideo)





export default consentRouter;