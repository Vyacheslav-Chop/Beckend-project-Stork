import Joi from 'joi';
import {
  nameTaskValidation,
  dateValidation,
  isDoneValidation,
} from './helpers.js';

const curDate = new Date();

export const createTaskValidationSchema = Joi.object({
  name: nameTaskValidation().messages({
    'string.min': 'Name should have a minimum length of {#limit}',
    'string.max': 'Name should have a maximum length of {#limit}',
    'any.required': 'Name is a required field',
  }),
  date: dateValidation(curDate).messages({
    'string.pattern.base': 'Date must be in YYYY-MM-DD format',
    'any.required': 'Date is a required field',
    'string.min': 'Date cannot be before today',
  }),
  isDone: isDoneValidation(),
});


export const getAllTasksValidationSchema = Joi.object({
  isDone: Joi.boolean().optional(),
  order: Joi.string().valid('asc', 'desc').default('asc'),
});
  
export const updateTaskValidationSchema = Joi.object({
  isDone: isDoneValidation().required().messages(
    { "any.required": "isDone is a required field", }
  )
});