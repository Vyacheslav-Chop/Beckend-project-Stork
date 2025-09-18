
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
