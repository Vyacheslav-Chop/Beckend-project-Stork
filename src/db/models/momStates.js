import { Schema, model } from 'mongoose';

const momStatesSchema = new Schema(
  {
    weekNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    feelings: {
      states: {
        type: [String],
        required: true,
      },
      sensationDescr: {
        type: String,
        required: true,
      },
    },
    comfortTips: [
      {
        category: {
          type: String,
          required: true,
        },
        tip: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const MomStates = model('momstates', momStatesSchema);
