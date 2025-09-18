
import createHttpError from 'http-errors';
import { BabyStateModel } from '../db/models/babyStates.js';
import { getWeeksMomStates, getWeekData } from '../services/week.js';

export const getBabyStateByWeek = async (req, res, next) => {
  const { week } = req.params;

  const babyState = await BabyStateModel.findOne({ weekNumber: Number(week) });

  if (!babyState) {
    throw createHttpError(404, `No data found for week ${week}`);
  }

  res.json({
    status: 200,
    message: `Successfully fetched baby development data for week ${week}`,
    data: babyState,
  });
};

export const getWeekPublicController = async (req, res) => {
  const { weekNumber } = 20;
  const data = await getWeekData(weekNumber);

  res.json({
    status: 200,
    message: 'The week has been successfully loaded.',
    data,
  });
};

export const getWeeksMomStatesController = async (req, res) => {
  const { weekNumber } = req.query;

  const data = await getWeeksMomStates(weekNumber ? Number(weekNumber) : null);

  res.json({
    status: 200,
    message: weekNumber
      ? `Successfully retrieved data for week ${weekNumber}`
      : 'Successfully retrieved all weeks data',
    data,
  });
};

export const getWeekPrivate = (req, res, next) => {
  try {
    const user = req.user

    if (!user) {
      throw createHttpError(401, 'Unauthorized');
    }

   const { dueData } = user;
   const weekFromQuery = Number(req.query.weekNumber); 

    let currentWeek;

    if (weekFromQuery && weekFromQuery >= 1 && weekFromQuery <= 42) {
      currentWeek = weekFromQuery;
    } else if (dueData) {
      const today = new Date();
      const endDate = new Date(dueData);
      const diffWeeks = Math.floor((280 - (endDate - today) / (1000 * 60 * 60 * 24)) / 7);
      currentWeek = diffWeeks > 0 ? diffWeeks : 1;
    } else {
      currentWeek = user.week || 20;
    }

    const data = getPrivateWeekData(currentWeek, dueData);

    res.json({
      status: 200,
      message: 'The week has been successfully loaded.',
      data,
    });
  } catch (err) {
    next(err);
  }
};

