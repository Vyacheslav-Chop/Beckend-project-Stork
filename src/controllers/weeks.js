import createHttpError from 'http-errors';
import {
  getWeeksMomStates,
  getPublicWeekData,
  getPrivateWeekData,
  getBabyStateByWeek,
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
  const data = await getWeeksMomStates(weekNumber ? Number(weekNumber) : null);

  res.json({
    status: 200,
    message: weekNumber
      ? `Successfully retrieved data for week ${weekNumber}`
      : 'Successfully retrieved all weeks data',
    data,
  });
};

export const getWeekPrivateController = async (req, res) => {
  const user = req.user;
  if (!req.user) {
    throw createHttpError(404, 'Week data not found');
  }

  const data = await getPrivateWeekData(user, Number(req.query.weekNumber));

  res.json({
    status: 200,
    message: 'The week has been successfully loaded.',
    data,
  });
};
