import express from "express"
import { isLogedIn } from "../middleware/isLogedIn.js";
import { upload } from "../middleware/multer.js";
import { saveConsentFormData, uploadImage } from "../controller/consentController/consentController.js";
import { consentFormValidate } from "../validation/consentFormValidate.js";



const consentRouter=express.Router();



consentRouter.post('/submitConsent',isLogedIn,consentFormValidate,saveConsentFormData)
consentRouter.post('/uploadImage',uploadImage)





export default consentRouter;