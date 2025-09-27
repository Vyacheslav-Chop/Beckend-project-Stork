import Joi from 'joi';
import {
  nameTaskValidation,
  dateValidation,
  isDoneValidation,
} from './helpers.js';

export const createTaskValidationSchema = Joi.object({
  name: nameTaskValidation().required().messages({
    'string.min': 'Name should have a minimum length of {#limit}',
    'string.max': 'Name should have a maximum length of {#limit}',
    'any.required': 'Name is a required field',
  }),
  date: dateValidation().required().messages({
    'string.pattern.base': 'Date must be in YYYY-MM-DD format',
    'any.required': 'Date is a required field',
    'string.min': 'Date cannot be before today',
  }),
  isDone: isDoneValidation(),
});

export const getAllTasksValidationSchema = Joi.object({
  sortOrder: Joi.string().valid('asc', 'desc').default('asc'),
  sortBy: Joi.string()
    .valid('_id', 'name', 'date', 'isDone','createdAt', 'updatedAt')
    .default('_id')
    .messages({
      'any.only':
        '"sortBy" must be one of "_id", "name", "createdAt", "updatedAt"',
    }),
  isDone: Joi.bool(),
});

export const updateTaskValidationSchema = Joi.object({
  name: nameTaskValidation().messages({
    'string.min': 'Name should have a minimum length of {#limit}',
    'string.max': 'Name should have a maximum length of {#limit}',
    'any.required': 'Name is a required field',
  }),
  date: dateValidation().messages({
    'string.pattern.base': 'Date must be in YYYY-MM-DD format',
    'string.min': 'Date cannot be before today',
  }),
});
