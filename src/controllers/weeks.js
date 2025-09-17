import { getWeekData } from '../services/week.js';

export const getWeekPublicController = (req, res, next) => {
  const data = getWeekData();
  res.json({
    status: 200,
    message: 'The week has been successfully loaded.',
    data,
  });
};
