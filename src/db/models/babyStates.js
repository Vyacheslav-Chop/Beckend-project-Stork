import { Schema, model } from 'mongoose';

const babyStateSchema = new Schema(
  {
    weekNumber: { type: Number, required: true, unique: true },
    analogy: { type: String, default: null },
    babySize: { type: Number, required: true },
    babyWeight: { type: Number, required: true },
    image: { type: String },
    babyActivity: { type: String },
    babyDevelopment: { type: String },
    interestingFact: { type: String },
    momDailyTips: [{ type: String }],
  },
  { versionKey: false, timestamps: true },
);

export const BabyState = model('BabyState', babyStateSchema);
