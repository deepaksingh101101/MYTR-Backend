import express from "express"
import { deleteTemplateById, editTemplateById, getAllCaseType, getAllTemplate, getQuestionByCaseType, getTemplateByCaseType, getTemplateById, saveTemplateFormData,getFaqsByCaseType } from "../controller/templateController/templateController.js";
import { isLogedIn } from "../middleware/isLogedIn.js";
import { templateCreateDataValidate, templateEditDataValidate,faqDataValidate } from "../validation/templateDataValidate.js";
// import { faqDataValidate } from "../validation/faqDataValidate.js";
import { isSuperAdmin } from "../middleware/isSuperAdmin.js";



const templateRouter=express.Router();



templateRouter.post('/submitTemplate',isLogedIn,isSuperAdmin,templateCreateDataValidate,saveTemplateFormData)
templateRouter.get('/getAllTemplate',isLogedIn,getAllTemplate)
templateRouter.post('/updateTemplate',isLogedIn,isSuperAdmin,templateEditDataValidate,editTemplateById)
templateRouter.delete('/deleteTemplate',isLogedIn,isSuperAdmin,deleteTemplateById)
templateRouter.get('/templateId',isLogedIn, getTemplateById);
templateRouter.get('/questionsByCaseType',isLogedIn, getQuestionByCaseType);
templateRouter.get('/getAllCaseType', getAllCaseType);
templateRouter.get('/getTemplateByCaseType', getTemplateByCaseType);
templateRouter.get('/faqs', getFaqsByCaseType);




export default templateRouter;