import express from "express"
import { deleteTemplateById, editTemplateById, getAllCaseType, getAllTemplate, getQuestionByCaseType, getTemplateById, saveTemplateFormData } from "../controller/templateController/templateController.js";
import { isLogedIn } from "../middleware/isLogedIn.js";
import { templateCreateDataValidate, templateEditDataValidate } from "../validation/templateDataValidate.js";
import { isSuperAdmin } from "../middleware/isSuperAdmin.js";



const templateRouter=express.Router();



templateRouter.post('/submitTemplate',isLogedIn,isSuperAdmin,templateCreateDataValidate,saveTemplateFormData)
templateRouter.get('/getAllTemplate',isLogedIn,getAllTemplate)
templateRouter.post('/updateTemplate',isLogedIn,isSuperAdmin,templateEditDataValidate,editTemplateById)
templateRouter.delete('/deleteTemplate',isLogedIn,isSuperAdmin,deleteTemplateById)
templateRouter.get('/templateId',isLogedIn, getTemplateById);
templateRouter.get('/questionsByCaseType',isLogedIn, getQuestionByCaseType);
templateRouter.get('/getAllCaseType', getAllCaseType);





export default templateRouter;