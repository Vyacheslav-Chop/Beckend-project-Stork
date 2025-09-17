// Сюди пишемо допоміжні функції для валідації як було на уроках
import Joi from 'joi';

export const nameValidation = () => Joi.string().min(2).max(30);
export const emailValidation = () => Joi.string().email();
export const passwordValidation = () => Joi.string().min(6).max(30);

export const nameTaskValidation = () => Joi.string().min(1).max(96).required();
//todo: откуда curedate &&
export const dateValidation = (curDate) => Joi.date().min(curDate).required();
export const isDoneValidation = () => Joi.boolean().default(false);
