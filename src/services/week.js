import createHttpError from 'http-errors';
import { BabyStatesModel } from '../db/models/babyStates.js';
import { MomStates } from '../db/models/momStates.js';
import {
  calculateCurrentWeek,
  calculateDaysToBirth,
  calculateFiveWeeksLater,
} from '../helpers/week.js';
import { User } from '../db/models/user.js';

export const getBabyStateByWeek = async (weekNumber) => {

  const babyState = await BabyStatesModel.findOne({ weekNumber });

  if (!babyState) {
    throw createHttpError(404, `Not  found data for week ${weekNumber}`);
  }
  return babyState;
};

export const getWeeksMomStates = async (weekNumber) => {
  const weekData = await MomStates.findOne({
    weekNumber,
  });

  if (!weekData) {
    throw createHttpError(404, `No data found for week ${weekNumber}`);
  }

  return weekData;
};

export const getPublicWeekData = async () => {
  const publicWeek = calculateFiveWeeksLater();

  const weekData = await BabyStatesModel.findOne({
    weekNumber: publicWeek,
  });

  if (!weekData) {
    throw createHttpError(404, 'Week data not found');
  }
  const daysToBirth = (42 - publicWeek) * 7;

  return {
    weekData,
    currentWeek: publicWeek,
    daysToBirth,
    isPersonalized: false,
  };
};

export const getPrivateWeekData = async (userId) => {
  const user = await User.findById(userId);

  const date =
    user?.dueDate ?? new Date(Date.now() + 36 * 7 * 24 * 60 * 60 * 1000);

  const currentWeek = calculateCurrentWeek(date);
  const daysToBirth = calculateDaysToBirth(currentWeek, user.dueDate);

  const weekData = await BabyStatesModel.findOne({
    weekNumber: currentWeek,
  });

  return {
    weekData,
    currentWeek,
    daysToBirth,
    isPersonalized: !!user?.dueDate,
  };
};
