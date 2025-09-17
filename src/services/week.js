import createHttpError from 'http-errors';

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
