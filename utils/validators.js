const {body} = require('express-validator/check')
const User = require('../models/user')

exports.registerValidators = [
  body('email')
    .isEmail()
    .withMessage('Enter a correct email')
    .custom(async (value, {req}) => {
      try {
        const user = await User.findOne({email: value})

        if (user) {
          return Promise.reject('This email already exists')
        }
      } catch (e) {
        console.log(e)
      }
    })
    .normalizeEmail(),
  body('password', 'Password must be at least 6 characters long')
    .isLength({min: 6, max: 56})
    .isAlphanumeric()
    .trim(),
  body('confirm')
    .custom((value, {req}) => {
      if (value !== req.body.password) {
        throw new Error('Password must match')
      }

      return true
    })
    .trim(),
  body('name')
    .isLength({min: 3})
    .withMessage('Name must be at least 3 characters long')
    .trim()
]

exports.loginValidators = [
  body('email')
    .isEmail()
    .withMessage('Enter a correct email')
    .custom(async (value, {req}) => {
      const user = await User.findOne({email: value})

      if (!user) {
        return Promise.reject('User doesnt exist')
      }
    })
    .normalizeEmail(),
  body('password', 'Password must be at least 6 characters long')
    .isLength({min: 3, max: 56})
    .isAlphanumeric()
    .trim(),
]

exports.courseValidators = [
  body('title')
    .isLength({min: 3})
    .withMessage('Title must be at least 3 characters long')
    .trim(),
  body('price')
    .isNumeric()
    .withMessage('Enter a correct price'),
  body('img')
    .isURL()
    .withMessage('Enter a correct image url')
]