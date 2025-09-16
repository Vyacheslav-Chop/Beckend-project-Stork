import { EmotionModel } from '../db/models/emotion.js';

export const getAllEmotions = async () => {
  const emotions = await EmotionModel.find();

  return emotions;
};
