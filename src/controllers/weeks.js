import createHttpError from 'http-errors';
import { BabyState } from '../db/models/babyStates.js';

export const getBabyStateByWeek = async (req, res, next) => {
  try {
    const { week } = req.params;

    const babyState = await BabyState.findOne({ weekNumber: Number(week) });

    if (!babyState) {
      throw createHttpError(404, `No data found for week ${week}`);
    }

    res.json({
      status: 200,
      message: `Successfully fetched baby development data for week ${week}`,
      data: babyState,
    });
  } catch (error) {
    next(error);
  }
};
