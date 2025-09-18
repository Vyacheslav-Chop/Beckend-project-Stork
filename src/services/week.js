import createHttpError from 'http-errors';
import { BabyStatesModel } from '../db/models/babyStates.js';
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

export const getWeekData = async (user, week) => {
  if (!user) {
    const notAuthInfo = {
      analogy: 'Банан',
      weekNumber: 20,
      babySize: 25.6,
      babyWeight: 300,
      image:
        'https://ftp.goit.study/img/lehlehka/6895ce04a5c677999ed2af38.webp',
      babyActivity:
        'Ви вже чітко відчуваєте рухи дитини. Це можуть бути поштовхи, перевертання, гикавка. Партнер теж може відчути їх, поклавши руку на живіт.',
      momDailyTips: 'Екватор! Половина шляху пройдена. Відзначте цю дату!',
    };
    return notAuthInfo;
  }

  const weekNumber = Number(week) || 20;

  const foundWeek = await BabyStatesModel.findOne({ weekNumber }).lean();

  if (!foundWeek) {
    throw createHttpError(404, 'The list of weeks is empty');
  }

  return { ...foundWeek };
};
