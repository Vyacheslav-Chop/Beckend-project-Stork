import Joi from 'joi';
import {
  emailValidation,
  genderValidation,
  nameValidation,
} from './helpers.js';

export const updateUserSchema = Joi.object({
  name: nameValidation(),
  email: emailValidation(),
  babyGender: genderValidation(),
  dueDate: Joi.date()
    .pattern(/^\d{2}\.\d{2}\.\d{4}$/)
    .optional(),
});
