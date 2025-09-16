import Joi from 'joi';
import { dataTaskValidation, nameValidation } from './helpers.js';

export const registerUserValidationSchema = Joi.object({
  nameTask: nameValidation.required().messages({
    'string.min': 'Text should have a minimum length of {#limit}',
    'string.max': 'Text should have a maximum length of {#limit}',
    'any.required': 'Name is a required field',
  }),
  dataTask: dataTaskValidation.required().messages({
    'string.dataUri': 'Data must be a valid data URI',
    'any.required': 'Data is a required field',
  }),
});
