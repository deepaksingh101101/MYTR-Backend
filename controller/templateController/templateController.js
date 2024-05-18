
import {validationResult} from 'express-validator'
import templateModel from '../../models/templateModel.js';


export const saveTemplateFormData = async (req, res, next) => {
    const errors = validationResult(req);
    const { caseType, questions, createdBy,html,deltaForm } = req.body;


    let isCaseTypeExist=await templateModel.find({caseType})
    console.log(isCaseTypeExist)
    if(isCaseTypeExist.length>=1){
    return res.status(401).json({status:false,message:"This Case Type Already Exist"})
    }

    try {
        if (errors.isEmpty()) {
            // Create a new instance of the consent model
            const template = await templateModel.create({
                caseType,
                questions,
                createdBy,
                html,
                deltaForm
            });


            // Save the consent data to the database
            await template.save();

            return res.status(200).json({ status: true, message: "Template data saved successfully" });
        } else {
            return res.status(422).json({ status: false, errors: errors.array() });
        }
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ status: false, message: "Internal Server Error" });
    }
};


export const getAllTemplate = async (req, res, next) => {
    try {
        // Retrieve all templates from the database
        const templates = await templateModel.find();

        return res.status(200).json({ status: true, templates });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ status: false, message: "Internal Server Error" });
    }
};


export const editTemplateById = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ status: false, errors: errors.array() });
        }

        const  templateId  = req.query.templateId;
      
        let { caseType, questions, updatedBy,html,deltaForm } = req.body;
        caseType = caseType.toLowerCase();

        // Find the template by ID and update it
        const updatedTemplate = await templateModel.findByIdAndUpdate({_id:templateId}, { caseType, questions, updatedBy,html,deltaForm }, { new: true });

        if (!updatedTemplate) {
            return res.status(404).json({ status: false, message: "Template not found" });
        }

        return res.status(200).json({ status: true, message: "Template updated successfully", template: updatedTemplate });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ status: false, message: "Internal Server Error" });
    }
};

// Delete template by ID
export const deleteTemplateById = async (req, res, next) => {
    try {
        const  templateId  = req.query.templateId;
        // Find the template by ID and delete it
        const deletedTemplate = await templateModel.findByIdAndDelete(templateId);

        if (!deletedTemplate) {
            return res.status(404).json({ status: false, message: "Template not found" });
        }

        return res.status(200).json({ status: true, message: "Template deleted successfully" });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ status: false, message: "Internal Server Error" });
    }
};



export const getTemplateById = async (req, res, next) => {
    try {
        const  templateId  = req.query.templateId;
   
        // Find the template by ID and delete it
        const template = await templateModel.findById(templateId);

        if (!template) {
            return res.status(404).json({ status: false, message: "Template not found" });
        }

        return res.status(200).json({ status: true,template });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ status: false, message: "Internal Server Error" });
    }
};



export const getQuestionByCaseType = async (req, res, next) => {
    try {
        let caseType = req.query.caseType; // Convert to lowercase

        const template = await templateModel.findOne({ caseType }); // Using findOne to get only one template

        if (!template) {
            return res.status(200).json({ status: true, questions:template });
        }

        // Assuming you want to return only the questions
        const questions = template.questions.map(question => question.text);

        return res.status(200).json({ status: true, questions });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ status: false, message: "Internal Server Error" });
    }
};



// export const getAllCaseType = async (req, res, next) => {
  
//     res.status(200).json({status:true,caseType:["cancer","fever","cough","legal"]})
// };



export const getAllCaseType = async (req, res, next) => {
    try {
      const templates = await templateModel.find({}, { caseType: 1, _id: 0 }); // Retrieve only the caseType field
  
      const caseTypes = templates.map(template => template.caseType); // Extract caseType from each document
  
      res.status(200).json({ status: true, caseType: caseTypes }); // Send the response in the desired format
    } catch (error) {
      console.error("Error fetching case types:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  
  
  export const getTemplateByCaseType = async (req, res, next) => {
    try {
        let caseType = req.query.caseType;
        
        // Query the database for the document with the matching caseType
        const template = await templateModel.findOne({ caseType: caseType });
        
        if (!template) {
            return res.status(404).json({ error: "Template not found" });
        }
        
        // Extract the deltaForm from the template document
        const deltaForm = template.deltaForm; // Replace "deltaForm" with the actual field name in your document
        
        // Return the deltaForm as a response
        res.status(200).json({ deltaForm });
    } catch (error) {
        console.error("Error fetching template:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};



