import { getAllEmotions } from '../services/emotion.js';

export const getAllEmotionsController = async (req, res) => {
  const emotions = await getAllEmotions();

  res.json({
    status: 200,
    message: 'uccessfully found emotions!',
    data: {
      emotions,
    },
  });
};
