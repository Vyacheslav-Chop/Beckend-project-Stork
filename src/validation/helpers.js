// Сюди пишемо допоміжні функції для валідації як було на уроках
import Joi from 'joi';
import { isValidObjectId } from 'mongoose';
import { GENDER } from '../constants/constants.js';

export const nameValidation = () => Joi.string().min(3).max(32);
export const emailValidation = () => Joi.string().email().max(64);
export const passwordValidation = () => Joi.string().min(8).max(128);

export const nameTaskValidation = () => Joi.string().min(1).max(96).required();
export const dateValidation = (curDate) => {
  const datePattern = /^\d{2}\.\d{2}\.\d{4}$/;

  return Joi.string()
    .pattern(datePattern)
    .required()
    .custom((value, helpers) => {
      const [day, month, year] = value.split('.').map(Number);
      const dateObj = new Date(year, month - 1, day);

      if (
        dateObj.getFullYear() !== year ||
        dateObj.getMonth() !== month - 1 ||
        dateObj.getDate() !== day
      ) {
        return helpers.message('Date must be a valid calendar date');
      }

      const today = new Date(curDate);
      today.setHours(0, 0, 0, 0);

      if (dateObj < today) {
        return helpers.message('Date cannot be before today');
      }

      return value;
    });
};

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
