import Joi from "joi";
import { emailValidation, nameValidation } from "./helpers.js";

export const updateUserSchema = Joi.object({
    name: nameValidation(),
    email: emailValidation(),
});