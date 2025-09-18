import { model, Schema } from 'mongoose';

const babyStateSchema = new Schema({
  analogy: {
    type: String,
  },
  weekNumber: {
    type: Number,
  },
  babySize: {
    type: Number,
  },
  babyWeight: {
    type: Number,
  },
  image: {
    type: String,
  },
  babyActivity: {
    type: String,
  },
  babyDevelopment: {
    type: String,
  },
  interestingFact: {
    type: String,
  },
  momDailyTips: {
    type: [String],
  },
});

export const BabyStateModel = model('babyStates', babyStateSchema);
