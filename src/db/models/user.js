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
    dueDate: {
      type: String,
      default: null,
    },
    babyGender: {
      type: String,
      enum: Object.values(GENDER),
      default: null,
    },
    avatar: {
      type: String,
      default: null,
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
