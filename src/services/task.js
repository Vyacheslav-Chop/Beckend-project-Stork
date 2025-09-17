import { TaskModel } from "../db/models/task.js";


export const createTask = async (payload) => {
  const task = await TaskModel.create(payload);

  return task;
};


const localTime = (date = new Date()) => {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Kyiv',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
};

const addDays = (baseDate, days) => {
  const day = new Date(baseDate);
  day.setDate(day.getDate() + days);
  return day;
};

export const getAllTasks = async ({ userId, isDone }) => {
  const now = new Date();
  const todayDate = localTime(now);
  const weekStart = localTime(addDays(now, 1));
  const weekEnd = localTime(addDays(now, 7));
  const base = { userId, ...(isDone !== undefined ? { isDone } : {}) };

  const [today, upcomingWeek] = await Promise.all([
    TaskModel.find({ ...base, date: todayDate })
      .sort({ date: 1, name: 1 }),
    TaskModel.find({ ...base, date: { $gte: weekStart, $lte: weekEnd } })
      .sort({ date: 1, name: 1 })
  ]);

  return { today, upcomingWeek };
};