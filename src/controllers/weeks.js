import { getWeeksMomStates } from '../services/week.js';

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
