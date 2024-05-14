import express from "express"
import { isLogedIn } from "../middleware/isLogedIn.js";
import { upload } from "../middleware/multer.js";
import { deleteConsentById, findConsentById, getAllConsent, saveConsentFormData, updateConsentById, uploadImage, uploadVideo } from "../controller/consentController/consentController.js";
import { consentFormValidate } from "../validation/consentFormValidate.js";



const consentRouter=express.Router();



consentRouter.post('/submitConsent',isLogedIn,consentFormValidate,saveConsentFormData)
consentRouter.get('/getAllConsent',getAllConsent)
consentRouter.delete('/consentById',deleteConsentById)
consentRouter.get('/consentById',findConsentById)
consentRouter.patch('/consentById',updateConsentById)




consentRouter.post('/uploadImage',uploadImage)
consentRouter.post('/uploadVideo',uploadVideo)





export default consentRouter;