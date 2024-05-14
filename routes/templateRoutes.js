import express from "express"
import { deleteTemplateById, editTemplateById, getAllTemplate, getTemplateByCaseType, getTemplateById, saveTemplateFormData } from "../controller/templateController/templateController.js";



const templateRouter=express.Router();



templateRouter.post('/submitTemplate',saveTemplateFormData)
templateRouter.get('/getAllTemplate',getAllTemplate)
templateRouter.post('/updateTemplate',editTemplateById)
templateRouter.delete('/deleteTemplate',deleteTemplateById)
templateRouter.get('/templateId', getTemplateById);
templateRouter.get('/templateByCaseType', getTemplateByCaseType);





export default templateRouter;