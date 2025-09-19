import Joi from 'joi';
import {
  categoryValidation,
  descriptionDiaryValidation,
  titleDieryValidation,
} from './helpers.js';

export const updateDiaryValidationSchema = Joi.object({
  title: titleDieryValidation().messages({
    'string.min': 'Title should have at least {#limit} characters',
    'string.max': 'Title should have at most {#limit} characters',
  }),
  category: categoryValidation(),
  description: descriptionDiaryValidation().messages({
    'string.min': 'Description should have at least {#limit} characters',
    'string.max': 'Description should have at most {#limit} characters',
  }),
});

export const getDiariesQuerySchema = Joi.object({
  sortBy: Joi.string().valid('createdAt', 'updatedAt').default('createdAt'),
  order: Joi.string().valid('asc', 'desc').default('desc'),
});

export const createDiaryValidationSchema = Joi.object({
  title: titleDieryValidation().required().messages({
    'any.required': 'Title is required',
    'string.min': 'Title should have at least {#limit} characters',
    'string.max': 'Title should have at most {#limit} characters',
  }),
  category: categoryValidation().required(),
  description: descriptionDiaryValidation().required().messages({
    'any.required': 'Description is required',
    'string.min': 'Description should have at least {#limit} characters',
    'string.max': 'Description should have at most {#limit} characters',
  }),
});
