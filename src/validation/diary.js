import Joi from "joi";
import { descriptionDiaryValidation, objectIdValidation, titleDieryValidation } from "./helpers.js";

export const updateDiaryValidationSchema = Joi.object({
  title: titleDieryValidation().messages({
    'string.min': 'Title should have at least {#limit} characters',
    'string.max': 'Title should have at most {#limit} characters',
  }),
  category: objectIdValidation(),
  description: descriptionDiaryValidation().messages({
    'string.min': 'Description should have at least {#limit} characters',
    'string.max': 'Description should have at most {#limit} characters',
  }),
});
