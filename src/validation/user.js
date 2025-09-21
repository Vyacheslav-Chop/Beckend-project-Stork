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
  dueDate: Joi.string()
    .pattern(/^\d{4}\.\d{2}\.\d{2}$/)
    .custom((value, helpers) => {
      const [year, month, day] = value.split('.').map(Number);
      const date = new Date(year, month - 1, day);

      if (
        date.getFullYear() !== year ||
        date.getMonth() !== month - 1 ||
        date.getDate() !== day
      ) {
        return helpers.error('any.invalid');
      }

      return value;
    }, 'valid YYYY.MM.DD date'),
});
