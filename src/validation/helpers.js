// Сюди пишемо допоміжні функції для валідації як було на уроках
import Joi from 'joi';

export const nameValidation = () => Joi.string().min(2).max(30);
export const emailValidation = () => Joi.string().email();
export const passwordValidation = () => Joi.string().min(6).max(30);
