// Сюди пишемо допоміжні функції для валідації як було на уроках
import Joi from 'joi';
import { isValidObjectId } from 'mongoose';
import { GENDER } from '../constants/constants.js';

export const nameValidation = () => Joi.string().min(3).max(32);
export const emailValidation = () => Joi.string().email().max(64);
export const passwordValidation = () => Joi.string().min(8).max(128);

export const nameTaskValidation = () => Joi.string().min(1).max(96).required();
export const dateValidation = (curDate) => Joi.date().min(curDate).required();
export const isDoneValidation = () => Joi.boolean().default(false);

export const objectIdValidation = () =>
  Joi.string().custom((value, helpers) => {
    const isValidId = isValidObjectId(value);

    if (!isValidId) return helpers.message('Not valid objectId');

    return value;
  });

export const titleDieryValidation = () => Joi.string().min(1).max(64);

export const descriptionDiaryValidation = () => Joi.string().min(1).max(1000);

export const weekPregnancyValidation = () =>
  Joi.number().integer().min(1).max(42);

export const genderValidation = () =>
  Joi.string().valid(...Object.values(GENDER));

export const categoryValidation = () => Joi.array().items(objectIdValidation()).min(1);
