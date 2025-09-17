import { GENDER } from '../constants/constants.js';
import Joi from 'joi';

export const genderValidation = () => {
  Joi.string().valid(...Object.values(GENDER));
};
