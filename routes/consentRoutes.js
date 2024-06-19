import express from "express"
import { isLogedIn } from "../middleware/isLogedIn.js";
import { uploadMultiple } from "../middleware/multer.js";
import { deleteConsentById, findConsentById, getAllConsent, saveConsentFormData, updateConsentById, uploadImage, uploadVideo } from "../controller/consentController/consentController.js";
import { consentFormValidate, consentUpdateFormValidate } from "../validation/consentFormValidate.js";
import fileUpload from 'express-fileupload';



const consentRouter=express.Router();



consentRouter.post('/submitConsent',consentFormValidate,saveConsentFormData)
consentRouter.get('/getAllConsent',isLogedIn,getAllConsent)
consentRouter.delete('/consentById',isLogedIn,deleteConsentById)
consentRouter.get('/consentById',isLogedIn,findConsentById)
consentRouter.patch('/consentById',isLogedIn,consentUpdateFormValidate,updateConsentById)




consentRouter.post('/uploadImage',isLogedIn,uploadMultiple,uploadImage)
consentRouter.post('/uploadVideo',isLogedIn, fileUpload({
    useTempFiles: false
}),uploadVideo)





export default consentRouter;