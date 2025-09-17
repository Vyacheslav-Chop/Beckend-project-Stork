import Joi from 'joi';
import {
  emailValidation,
  nameValidation,
  passwordValidation,
} from './helpers.js';

export const registerUserValidationSchema = Joi.object({
  name: nameValidation().required(),
  email: emailValidation().required(),
  password: passwordValidation().required(),
});
export const loginUserSchema = Joi.object({
  email: emailValidation().required(),
  password: passwordValidation().required(),
});
