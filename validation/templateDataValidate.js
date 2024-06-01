import { body } from 'express-validator';

export const faqDataValidate = [
  body('caseType', 'Case Type is required').notEmpty(),
  body('faqs.*.title', 'Title is required').notEmpty(),
  body('faqs.*.description', 'FAQ description is required').notEmpty(),
  body('faqs.*.imageUrl', 'FAQ image URL is required').notEmpty(),
  body('faqs.*.videoUrl', 'FAQ video URL is required').notEmpty(),
];
export const templateCreateDataValidate = [
  body('caseType', 'Case Type is Required').notEmpty(),
  body('questions', 'Questions should be a non-empty array').isArray({ min: 1 }).withMessage('At least one question is required'),
  body('questions.*.text', 'Question text should not be empty').notEmpty(),
  body('faqs', 'FAQs should be an array').isArray(),
  ...faqDataValidate,
  body('createdBy', 'Created By is Required').notEmpty().isString().withMessage('Created By should be a string'),
];

export const templateEditDataValidate = [
    body('caseType', 'Case Type is Required').notEmpty(),
    body('questions', 'Questions should be a non-empty array').isArray({ min: 1 }).withMessage('At least one question is required'),
    body('questions.*.text', 'Question text should not be empty').notEmpty(),
    body('faqs', 'FAQs should be an array').isArray(),
    ...faqDataValidate,
    body('updatedBy', 'Updated By is Required').notEmpty().isString().withMessage('Updated By should be a string'),
  ];

  
  