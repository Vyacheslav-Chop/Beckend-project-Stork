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
  dueData: Joi.string()
    .pattern(/^\d{2}\.\d{2}\.\d{4}$/)
    .custom((value, helpers) => {
      const [day, month, year] = value.split('.').map(Number);
      const date = new Date(year, month - 1, day);
      if (
        date.getDate() !== day ||
        date.getMonth() !== month - 1 ||
        date.getFullYear() !== year
      ) {
        return helpers.error('any.invalid');
      }
      return value;
    }, 'valid DD.MM.YYYY date'),
});
