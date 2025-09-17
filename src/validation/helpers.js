// Сюди пишемо допоміжні функції для валідації як було на уроках
// import Joi from 'joi';
// import { isValidObjectId } from 'mongoose';

// export const nameValidation = () => Joi.string().min(2).max(30);
// export const emailValidation = () => Joi.string().email();
// export const passwordValidation = () => Joi.string().min(6).max(30);

// export const objectIdValidation = () =>
//   Joi.string().custom((value, helpers) => {
//     const isValidId = isValidObjectId(value);

//     if (!isValidId) return helpers.message('Not valid objectId');

//     return value;
//   });

// export const titleDieryValidation = () => Joi.string().min(1).max(64);

// export const descriptionDiaryValidation = () => Joi.string().min(1).max(1000);

import Joi from 'joi';
import { isValidObjectId } from 'mongoose';

export const nameValidation = () => Joi.string().min(2).max(30);
export const emailValidation = () => Joi.string().email();
export const passwordValidation = () => Joi.string().min(6).max(30);

export const objectIdValidation = () =>
  Joi.string().custom((value, helpers) => {
    const isValidId = isValidObjectId(value);

    if (!isValidId) return helpers.message('Not valid objectId');

    return value;
  });

export const titleDieryValidation = () => Joi.string().min(1).max(64);

export const descriptionDiaryValidation = () => Joi.string().min(1).max(1000);
