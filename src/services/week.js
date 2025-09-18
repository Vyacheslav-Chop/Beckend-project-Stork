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

export const getPublicWeekData = async (weekNumber = 20) => {
  const notAuthInfo = {
    analogy: 'Банан',
    weekNumber: 20,
    babySize: 25.6,
    babyWeight: 300,
    image: 'https://ftp.goit.study/img/lehlehka/6895ce04a5c677999ed2af38.webp',
    babyActivity:
      'Ви вже чітко відчуваєте рухи дитини. Це можуть бути поштовхи, перевертання, гикавка. Партнер теж може відчути їх, поклавши руку на живіт.',
    momDailyTips: 'Екватор! Половина шляху пройдена. Відзначте цю дату!',
  };

  return notAuthInfo;
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
