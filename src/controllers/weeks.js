import createHttpError from 'http-errors';
import {
  getWeeksMomStates,
  getPublicWeekData,
  // getPrivateWeekData,
  getBabyStateByWeek,
  getCurrentWeekData,
} from '../services/week.js';

export const getBabyStateByWeekController = async (req, res) => {
  const { weekNumber } = req.query;

  const babyState = await getBabyStateByWeek(weekNumber);

  res.json({
    status: 200,
    message: 'The week has been successfully loaded.',
    data: babyState,
  });
};

export const getWeekPublicController = async (req, res) => {
  const data = await getPublicWeekData();

  res.json({
    status: 200,
    message: 'The week has been successfully loaded.',
    data,
  });
};

export const getWeeksMomStatesController = async (req, res) => {
  const { weekNumber } = req.query;

  let week = null;
  if (weekNumber !== undefined) {
    week = Number(weekNumber);

    if (!Number.isInteger(week) || week < 1 || week > 42) {
      throw createHttpError(
        400,
        'weekNumber must be a number between 1 and 42',
      );
    }
  }

  const data = await getWeeksMomStates(week);

  res.json({
    status: 200,
    message: week
      ? `Successfully retrieved data for week ${week}`
      : 'Successfully retrieved all weeks data',
    data,
  });
};

export const pregnancyController = async (req, res) => {
  const userId = req.user.id;
  const data = await getCurrentWeekData(userId);

  res.json({
    status: 200,
    message: 'The week has been successfully loaded.',
    data,
  });
};
