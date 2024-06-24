
import {validationResult} from 'express-validator'
import consentModel from '../../models/consentModel.js';
import path, { parse } from 'path'

import { getStorage, ref ,uploadBytesResumable } from 'firebase/storage'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from '../../config/firbase.config.js';

import {uploadImageMiddleware} from '../../helpers/uploadImageMiddleware.js'
import { uploadVideoMiddleware } from '../../helpers/uploadVideoMiddleware.js';

export const saveConsentFormData = async (req, res, next) => {
    const errors = validationResult(req);
    const {address,dob,gender, patientName, gaurdianName, createdBy,caseType, question, patientSignatureUrl,surgeonSignatureUrl, patientId, mobileNo, adharCard,VideoUrl,relation, customFields } = req.body;

    try {
        if (errors.isEmpty()) {

            // Create a new instance of the consent model
            const consentData = new consentModel({
                patientName,
                gaurdianName,
                caseType,
                question,
                patientSignatureUrl,
                surgeonSignatureUrl,
                VideoUrl,
                patientId,
                mobileNo,
                adharCard,
                createdBy,
                address,
                dob,
                gender,
                relation,
                customFields
            });


            // Save the consent data to the database
            await consentData.save();

            return res.status(200).json({ status: true,consentData, message: "Consent data saved successfully" });
        } else {
            return res.status(422).json({ status: false, errors: errors.array() });
        }
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ status: false, message: "Internal Server Error" });
    }
};

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
        return res.status(200).json({ status: true, consent });
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
