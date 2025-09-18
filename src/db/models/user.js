import { model, Schema } from 'mongoose';
import { GENDER } from '../../constants/constants.js';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    dueData: {
      type: String,
    },
    babyGender: {
      type: String,
      enum: Object.values(GENDER),
    },

    avatar: {
      type: String,
    },
  },

  {
    timestamps: true,
    versionKey: false,
  },
);

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};
export const User = model('users', userSchema);
