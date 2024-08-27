
import {validationResult} from 'express-validator'
import consentModel from '../../models/consentModel.js';
import path, { parse } from 'path'
import templateModel from '../../models/templateModel.js';

import { getStorage, ref ,uploadBytesResumable } from 'firebase/storage'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from '../../config/firbase.config.js';

import {uploadImageMiddleware} from '../../helpers/uploadImageMiddleware.js'
import { uploadVideoMiddleware } from '../../helpers/uploadVideoMiddleware.js';


export const saveConsentFormData = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ status: false, errors: errors.array() });
    }

    const { patientId, patientSignatureUrl, ...data } = req.body;

    try {
        // Attempt to update the existing document
        let updatedConsent = await consentModel.findOneAndUpdate({ patientId }, {
            ...data,
            ...(patientSignatureUrl && { patientSignatureUrl, status: 'submitted' })
        }, { new: true, upsert: true }); // 'upsert: true' will create a new document if one doesn't exist

        if (!updatedConsent) {
            // Logically this block will not be executed because 'upsert: true' creates a new document if not found
            // Keeping this for educational purposes or additional logic can be placed here
            console.log('No document was found and a new one was created');
        }

        return res.status(200).json({ status: true, consent: updatedConsent, message: "Consent data saved successfully" });
    } catch ( error) {
        console.error("Error:", error);
        return res.status(500).json({ status: false, message: "Internal Server Error" });
    }
};


// export const saveConsentFormData = async (req, res, next) => {
//     const errors = validationResult(req);
//     const { patientId, patientSignatureUrl, ...data } = req.body;

//     try {
//         if (errors.isEmpty()) {
//             // Check if a consent form with the given patientId already exists
//             let consent = await consentModel.findOne({ patientId });

//             if (consent) {
//                 // Update the existing consent form with the new data
//                 Object.assign(consent, data);

//                 // If patient signature is included, change status to submitted
//                 if (patientSignatureUrl) {
//                     consent.patientSignatureUrl = patientSignatureUrl;
//                     consent.status = 'submitted';
//                 }
//             } else {
//                 // Create a new consent form
//                 consent = new consentModel({ patientId, patientSignatureUrl, ...data });

//                 // If patient signature is included, change status to submitted
//                 if (patientSignatureUrl) {
//                     consent.status = 'submitted';
//                 }
//             }

//             // Save the consent data to the database
//             await consent.save();

//             return res.status(200).json({ status: true, consent, message: "Consent data saved successfully" });
//         } else {
//             return res.status(422).json({ status: false, errors: errors.array() });
//         }
//     } catch (error) {
//         console.error("Error:", error);
//         return res.status(500).json({ status: false, message: "Internal Server Error" });
//     }
// };


export const getAllConsent = async (req, res, next) => {
    try {
        const consentData = await consentModel.find();
        return res.status(200).json({ status: true, consentData });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ status: false, message: "Internal Server Error" });
    }
};

export const deleteConsentById = async (req, res, next) => {
    try {
        const consentId = req.query.consentId;
        const consent = await consentModel.findByIdAndDelete(consentId);
        if (!consent) {
            return res.status(404).json({ status: false, message: "No consent data found with this ID" });
        }
        return res.status(200).json({ status: true, message: "Consent data deleted successfully" });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ status: false, message: "Internal Server Error" });
    }
};



export const findConsentById = async (req, res, next) => {
    try {
        const consentId = req.query.consentId;
        const consent = await consentModel.findById(consentId);
        if (!consent) {
            return res.status(404).json({ status: false, message: "No consent data found with this ID" });
        }
        const template = await templateModel.findOne({ caseType: consent.caseType }); 

        if (!template || !template.summary) {
            console.warn("No template or summary found for case type:", consent.caseType);
        }
        return res.status(200).json({ 
            status: true, 
            consent ,
            summary:template?template.summary:null
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ status: false, message: "Internal Server Error" });
    }
};



export const updateConsentById = async (req, res, next) => {
    const errors = validationResult(req);
    const consentId = req.query.consentId;
    const {updatedBy,address,dob,gender, patientName, gaurdianName,caseType, question, patientId, mobileNo, adharCard,VideoUrl,relation,customFields } = req.body;

    try {
        if (errors.isEmpty()) {
            const consent = await consentModel.findByIdAndUpdate(consentId, {
                patientName,
                gaurdianName,
                caseType,
                question,
                patientId,
                mobileNo,
                adharCard,
                address,
                dob,
                gender,
                updatedBy,
                relation,
                customFields

            }, { new: true });



            if (!consent) {
                return res.status(404).json({ status: false, message: "No consent data found with this ID" });
            }

            return res.status(200).json({ status: true, message: "Consent data updated successfully", consent });
        } else {
            return res.status(422).json({ status: false, errors: errors.array() });
        }
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ status: false, message: "Internal Server Error" });
    }
};


export const uploadImage = async (req, res, next) => {
    const errors = validationResult(req);
  
    try {
      if (errors.isEmpty()) {
        const files = req.files;
  
        if (!files || files.length === 0) {
          return res.status(400).json({ status: false, message: "No files uploaded" });
        }
  
        try {
          const imageUrls = await uploadImageMiddleware(files, 'multiple');
          console.log(imageUrls);
          res.status(200).send({
            status: true,
            imageUrls
          });
        } catch (err) {
          console.log(err);
          return res.status(500).json({ status: false, message: "Error uploading images" });
        }
      } else {
        return res.status(422).json({ status: false, errors: errors.array() });
      }
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ status: false, message: "Internal Server Error" });
    }
  };


export const uploadVideo = async (req, res, next) => {
    const errors = validationResult(req);

   
        if (errors.isEmpty()) {
            const file = {
                type: req.files?.video?.mimetype,
                buffer: req.files?.video?.data
            };
           

            try {
                const buildVideo = await uploadVideoMiddleware(file, 'single');
                console.log(buildVideo)

               return res.status(200).json({
                    status: true,
                    videoUrl: buildVideo
                });
                
            } catch (err) {
                console.log(err);
                return res.status(500).json({ status: false, message: "Error uploading Video" });
            }
        } else {
            return res.status(422).json({ status: false, errors: errors.array() });
        }
 
}
