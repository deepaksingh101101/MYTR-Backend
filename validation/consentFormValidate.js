import {body} from 'express-validator'

export const consentFormValidate = [
  body('patientName', 'Patient Name is Required').notEmpty(),
  body('gaurdianName', 'Gaurdian Name is Required').notEmpty(),
  body('caseType', 'Case Type is Required').notEmpty(),
  body('question', 'Question Should not be empty').notEmpty(),
  body('signatureUrl', 'Signature Url is required').notEmpty(),
  body('VideoUrl', 'Video Url is required').notEmpty(),
  body('createdBy', 'Should be and email').isEmail(),
  body('patientId', 'Patient Id By is Required').notEmpty(),
  body('address', 'Address is Required').notEmpty(),
  body('dob', 'DOB is Required').notEmpty(),
  body('mobileNo')
  .notEmpty().withMessage('Mobile number is required')
  .isLength({ min: 10 }).withMessage('Mobile number must be at least 10 characters long'),
  body('adharCard')
  .notEmpty().withMessage('Adhar number is required')
  .isLength({ min: 12 }).withMessage('Adhar number must be at least 12 characters long'),
]


export const consentUpdateFormValidate = [
  body('patientName', 'Patient Name is Required').notEmpty(),
  body('gaurdianName', 'Gaurdian Name is Required').notEmpty(),
  body('caseType', 'Case Type is Required').notEmpty(),
  body('question', 'Question Should not be empty').notEmpty(),
  body('signatureUrl', 'Signature Url is required').notEmpty(),
  body('VideoUrl', 'Video Url is required').notEmpty(),
  body('updatedBy', 'Updated By is Required').notEmpty(),
  body('patientId', 'Patient Id By is Required').notEmpty(),
  body('address', 'Address is Required').notEmpty(),
  body('dob', 'DOB is Required').notEmpty(),
  body('mobileNo')
  .notEmpty().withMessage('Mobile number is required')
  .isLength({ min: 10 }).withMessage('Mobile number must be at least 10 characters long'),
  body('adharCard')
  .notEmpty().withMessage('Adhar number is required')
  .isLength({ min: 12 }).withMessage('Adhar number must be at least 12 characters long'),
]
