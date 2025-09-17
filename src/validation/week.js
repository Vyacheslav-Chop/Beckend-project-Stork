import Joi from 'joi';
import { weekPregnancyValidation } from '../validation/helpers.js';

export const weekPregnancyValidationSchema = Joi.object({
  week: weekPregnancyValidation(),
});
