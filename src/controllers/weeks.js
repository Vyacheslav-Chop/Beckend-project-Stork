import {
  getWeeksMomStates,
  getPublicWeekData,
  getPrivateWeekData,
  getBabyStateByWeek,
} from '../services/week.js';

export const getBabyStateByWeekController = async (req, res) => {
  const { week } = req.params;

  const babyState = await getBabyStateByWeek(week);

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
  const { week } = req.params;

  const data = await getWeeksMomStates(Number(week));

  res.json({
    status: 200,
    message: `Successfully retrieved data for week ${week}`,
    data,
  });
};

export const getPrivateWeekDataController = async (req, res) => {
  const userId = req.user.id;
  const data = await getPrivateWeekData(userId);

  res.json({
    status: 200,
    message: 'The week has been successfully loaded.',
    data,
  });
};
