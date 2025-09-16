import Joi from 'joi';

export const registerUserValidationSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string().min().max().required(),
  password: Joi.string().required(),
});
