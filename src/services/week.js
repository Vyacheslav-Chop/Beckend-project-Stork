import createHttpError from 'http-errors';
import { BabyStatesModel } from '../db/models/babyStates.js';
import { MomStates } from '../db/models/momStates.js';

export const getBabyStateByWeek = async (req, res) => {
  const { weekNumber } = req.query;

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

export const getPrivateWeekData = (week, dueDate) => {
  const data = getWeekData(week);

  let daysToBirth;
  if (dueDate) {
    const today = new Date();
    const endDate = new Date(dueDate);
    daysToBirth = Math.max(
      0,
      Math.ceil((endDate - today) / (1000 * 60 * 60 * 24)),
    );
  } else {
    const maxWeeks = 42;
    daysToBirth = (maxWeeks - week) * 7;
  }
  return { ...data, daysToBirth };
};
