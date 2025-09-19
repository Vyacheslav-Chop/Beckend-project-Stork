import createHttpError from 'http-errors';
import { BabyStatesModel } from '../db/models/babyStates.js';
import { MomStates } from '../db/models/momStates.js';
import { calculateCurrentWeek, calculateDaysToBirth } from '../helpers/week.js';

export const getBabyStateByWeek = async (weekNumber) => {
  const babyState = await BabyStatesModel.findOne({ weekNumber });

  if (!babyState) {
    throw createHttpError(404, `Not  found data for week ${weekNumber}`);
  }
  return babyState;
};

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

export const getPublicWeekData = async () => {
  const today = new Date();
  const fiveWeeksLater = new Date(today);
  fiveWeeksLater.setDate(today.getDate() + 7 * 37);

  const publicWeek = calculateCurrentWeek(
    { dueDate: fiveWeeksLater },
    undefined,
  );

  const weekData = await BabyStatesModel.find({
    weekNumber: publicWeek,
  }).lean();

  if (!weekData) {
    throw createHttpError(404, 'Week data not found');
  }

  return {
    ...weekData,
    currentWeek: publicWeek,
    isPersonalized: false,
  };
};

export const getPrivateWeekData = async (user, weekFromQuery) => {
  const currentWeek = calculateCurrentWeek(user, weekFromQuery);

  const weekData = await BabyStatesModel.findOne({
    weekNumber: currentWeek,
  }).lean();

  if (!weekData) {
    throw createHttpError(404, 'Week data not found');
  }

  const daysToBirth = calculateDaysToBirth(currentWeek, user.dueDate);

  return {
    ...weekData,
    currentWeek,
    daysToBirth,
    isPersonalized: true,
  };
};
