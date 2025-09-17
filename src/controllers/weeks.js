import { getWeeksMomStates } from '../services/week.js';
import { getWeekData } from '../services/week.js';

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
