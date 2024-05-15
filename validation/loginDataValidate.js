import {body} from 'express-validator'

export const loginDataValidate = [
  body('email', 'Invalid email').isEmail(),
]

export const ForgetDataValidate = [
  body('email', 'Invalid email').isEmail()
]
export const otpDataValidate = [
  body('otp', 'Minimum length should be 6').isLength({min: 6,max:6}),
  body('email', 'Invalid email').isEmail()
]

export const newPasswordDataValidate = [
  body('email', 'Invalid email').isEmail()
]

export const registerDataValidate = [
  body('email', 'Invalid email').isEmail(),
  body('isSuperAdmin', 'isSuperAdmin Should be of Boolean Type').isBoolean(),
  body('loggedInUserId', 'loggedInUserId  is Required').notEmpty(),

]