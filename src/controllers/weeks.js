import createHttpError from 'http-errors';
import {
  getWeeksMomStates,
  getPublicWeekData,
  getBabyStateByWeekService,
  getPrivateWeekData,
} from '../services/week.js';

export const getBabyStateByWeek = async (req, res) => {
  const { week } = req.params;
  const data = await getBabyStateByWeekService(week);

  res.json({
    status: 200,
    message: `Successfully fetched baby development data for week ${week}`,
    data,
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
