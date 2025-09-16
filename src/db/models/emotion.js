import { model, Schema } from 'mongoose';

const emotionSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
});

export const EmotionModel = model('emotions', emotionSchema);
