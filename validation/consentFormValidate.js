import {body} from 'express-validator'

export const consentFormValidate = [
  body('patientName', 'Patient Name is Required').notEmpty(),
  body('gaurdianName', 'Gaurdian Name is Required').notEmpty(),
  body('caseType', 'Case Type is Required').notEmpty(),
  body('question', 'Question Should not be empty').notEmpty(),
  body('patientSignatureUrl', 'Patient Signature Url is required').notEmpty(),
  body('surgeonSignatureUrl', 'Surgeon Signature Url is required').notEmpty(),
  body('VideoUrl', 'Video Url is required').notEmpty(),
  body('createdBy', 'Should be and email').isEmail(),
  body('patientId', 'Patient Id By is Required').notEmpty(),
  body('address', 'Address is Required').notEmpty(),
  body('dob', 'DOB is Required').notEmpty(),
  body('mobileNo',"Mobile number is required").notEmpty(),
  body('adharCard',"Aadhar number is required").notEmpty(),
  body('relation',"Relation with  patient is required").notEmpty(),
  body('customFields',"Custom Fields are required").notEmpty(),
]
//updated validation

export const consentUpdateFormValidate = [
  body('patientName', 'Patient Name is Required').notEmpty(),
  body('gaurdianName', 'Gaurdian Name is Required').notEmpty(),
  body('caseType', 'Case Type is Required').notEmpty(),
  body('question', 'Question Should not be empty').notEmpty(),
  body('updatedBy', 'Updated By is Required').notEmpty(),
  body('patientId', 'Patient Id By is Required').notEmpty(),
  body('address', 'Address is Required').notEmpty(),
  body('dob', 'DOB is Required').notEmpty(),
  body('mobileNo',"Mobile number is required").notEmpty(),
  body('adharCard',"Aadhar number is required").notEmpty(),
  body('relation',"Relation with  patient is required").notEmpty(),
  body('customFields',"Custom Fields are required").notEmpty(),
]
