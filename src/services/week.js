import createHttpError from 'http-errors';
import { BabyStateModel } from '../db/models/babyStates.js';

export const getWeekData = () => {
  const week = 20;
  const foundWeek = BabyStateModel.findOne({ weekNumber: week });

  if (!foundWeek) {
    throw createHttpError(404, 'The list of weeks is empty');
  }
  return foundWeek;
};
