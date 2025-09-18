import Joi from 'joi';
import { weekPregnancyValidation } from '../validation/helpers.js';

export const weekParamSchema = Joi.object({
  week: Joi.number().integer().min(1).max(42).required().messages({
    'number.base': 'Week must be a number',
    'number.integer': 'Week must be an integer',
    'number.min': 'Week must be at least 1',
    'number.max': 'Week cannot be more than 42',
    'any.required': 'Week parameter is required',
  }),

export const weekPregnancyValidationSchema = Joi.object({
  week: weekPregnancyValidation(),

});
