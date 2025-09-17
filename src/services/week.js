import createHttpError from 'http-errors';
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

const babyState = [
  {
    weekNumber: 20,
    babySize: 25.6,
    babyWeight: 300,
    image: 'https://ftp.goit.study/img/lehlehka/6895ce04a5c677999ed2af38.webp',
    babyActivity:
      'Ви вже чітко відчуваєте рухи дитини. Це можуть бути поштовхи, перевертання, гикавка. Партнер теж може відчути їх, поклавши руку на живіт.',
    momDailyTips: [
      'Екватор! Половина шляху пройдена. Відзначте цю дату!',
      'На УЗД в цей період зазвичай можна визначити стать дитини, якщо ви цього хочете.',
      'Живіт росте активно, пупок може почати випирати. Це нормально.',
      "Може з'явитися печія. Намагайтеся їсти маленькими порціями, уникайте гострої, жирної та кислої їжі.",
      'Почніть складати список речей, необхідних для дитини на перший час.',
      'Збільшення ваги стає більш помітним. Дотримуйтеся рекомендацій лікаря щодо набору ваги.',
      "Пам'ятайте, що кожна вагітність унікальна. Не порівнюйте себе з іншими.",
    ],
  },
];

export const getWeekData = (weekNumber) => {
  const week = Number(weekNumber);
  const foundWeek = babyState.find((item) => item.week === week);

  if (!foundWeek) {
    throw createHttpError(404, 'The list of weeks is empty');
  }
  return foundWeek;
};

export const getPrivateWeekData = (week, dueDate) => {
  const data = getWeekData(week);

  let daysToBirth;
  if (dueDate) {
    const today = new Date();
    const endDate = new Date(dueDate);
    daysToBirth = Math.max(0, Math.ceil((endDate - today) / (1000 * 60 * 60 * 24)));
  } else {
    const maxWeeks = 42;
    daysToBirth = (maxWeeks - week) * 7;
  }
  return { ...data, daysToBirth };
}