import Joi from "joi";
import { emailValidation, nameValidation } from "./helpers.js";
import { GENDER } from '../constants/constants.js';

export const updateUserSchema = Joi.object({
    name: nameValidation(),
    email: emailValidation(),
});

export const genderValidation = () => {
  Joi.string().valid(...Object.values(GENDER));
};

