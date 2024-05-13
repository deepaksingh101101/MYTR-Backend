
import {validationResult} from 'express-validator'
import consentModel from '../../models/consentModel.js';
import path, { parse } from 'path'

import { getStorage, ref ,uploadBytesResumable } from 'firebase/storage'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from '../../config/firbase.config.js';

import {uploadImageMiddleware} from '../../helpers/uploadImageMiddleware.js'

export const saveConsentFormData = async (req, res, next) => {
    const errors = validationResult(req);
    const { patientName, gaurdianName, caseType, question, signatureUrl, patientId, mobileNo, adharCard } = req.body;

    try {
        if (errors.isEmpty()) {
            // Create a new instance of the consent model
            const consentData = new consentModel({
                patientName,
                gaurdianName,
                caseType,
                question,
                signatureUrl,
                patientId,
                mobileNo,
                adharCard
            });

            // Save the consent data to the database
            await consentData.save();

            return res.status(200).json({ status: true, message: "Consent data saved successfully" });
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
            const file = {
                type: req.files.Image.mimetype,
                buffer: req.files.Image.data
            };

            try {
                const buildImage = await uploadImageMiddleware(file, 'single');
                res.send({
                    status: "SUCCESS",
                    imageName: buildImage
                });
                
            } catch (err) {
                console.log(err);
                return res.status(500).json({ status: false, message: "Error uploading image" });
            }
        } else {
            return res.status(422).json({ status: false, errors: errors.array() });
        }
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ status: false, message: "Internal Server Error" });
    }
};
