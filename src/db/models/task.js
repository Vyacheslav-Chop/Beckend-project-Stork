import { Schema, model } from 'mongoose';

const taskSchema = new Schema(
  {
    nameTask: {
      type: String,
      required: true,
    },
    dataTask: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Task = model('task', taskSchema);
