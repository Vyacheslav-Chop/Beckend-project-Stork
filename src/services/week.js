import createHttpError from 'http-errors';
import { BabyStatesModel } from '../db/models/babyStates.js';
import { MomStates } from '../db/models/momStates.js';
import { calculateCurrentWeek, calculateDaysToBirth } from '../helpers/week.js';
import { User } from '../db/models/user.js';

export const getBabyStateByWeek = async (weekNumber) => {
  console.log('weekNumber:', weekNumber);

  const babyState = await BabyStatesModel.find({ weekNumber });

  console.log('babyState:', babyState);

  if (!babyState) {
    throw createHttpError(404, `Not  found data for week ${weekNumber}`);
  }
  return babyState;
};

export const getWeeksMomStates = async (weekNumber) => {
  const weekData = await MomStates.findOne({
    weekNumber: Number(weekNumber),
  });

  if (!weekData) {
    throw createHttpError(404, `No data found for week ${weekNumber}`);
  }

  return weekData;
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

export const getCurrentWeekData = async (userId) => {
  const user = await User.findById(userId).lean();

  const date = user?.dueDate || user?.dueData;

  const currentWeek = calculateCurrentWeek(date);
  const daysToBirth = calculateDaysToBirth(currentWeek, user.dueDate);

  const weekData = await BabyStatesModel.findOne({
    weekNumber: currentWeek,
  }).lean();

  return {
    weekData,
    currentWeek,
    daysToBirth,
    isPersonalized: true,
  };
};
