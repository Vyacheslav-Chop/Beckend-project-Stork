import createHttpError from 'http-errors';
import { BabyStateModel } from '../db/models/babyStates.js';
import { MomStates } from '../db/models/momStates.js';

export const getWeeksMomStates = async (weekNumber) => {
  if (weekNumber) {
    const weekData = await MomStates.findOne({
      weekNumber: Number(weekNumber),
    });

    if (!weekData) {
      throw createHttpError(404, `No data found for week ${weekNumber}`);
    }

    return weekData;
  }

  const allWeeksData = await MomStates.find();

  return allWeeksData;
};

export const getWeekData = () => {
  const week = 20;
  const foundWeek = BabyStateModel.findOne({ weekNumber: week });

  if (!foundWeek) {
    throw createHttpError(404, 'The list of weeks is empty');
  }
  return foundWeek;
};
