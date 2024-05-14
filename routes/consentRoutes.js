import express from "express"
import { isLogedIn } from "../middleware/isLogedIn.js";
import { upload } from "../middleware/multer.js";
import { saveConsentFormData, uploadImage, uploadVideo } from "../controller/consentController/consentController.js";
import { consentFormValidate } from "../validation/consentFormValidate.js";



const consentRouter=express.Router();



consentRouter.post('/submitConsent',isLogedIn,consentFormValidate,saveConsentFormData)
consentRouter.post('/uploadImage',uploadImage)
consentRouter.post('/uploadVideo',uploadVideo)





export default consentRouter;