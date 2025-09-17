import { getWeekData } from '../services/week.js';

export const geetWeekPublic = (req, res, next) => {
  try {
    const data = getWeekData(20);
    res.json({
      status: 200,
      message: 'The week has been successfully loaded.',
      data,
    });
  } catch (err) {
    next(err);
  }
};
