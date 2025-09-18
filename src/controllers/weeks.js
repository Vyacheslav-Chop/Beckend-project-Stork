import { getWeeksMomStates } from '../services/week.js';
import { getWeekData } from '../services/week.js';

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
