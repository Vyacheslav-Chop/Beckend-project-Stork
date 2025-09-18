import { User } from '../db/models/user.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { saveFile } from '../utils/saveFile.js';
import createHttpError from 'http-errors';

export const updateUserById = async (userId, payload) => {
  const user = await User.findOneAndUpdate({ _id: userId }, payload, {
    new: true,
    runValidators: true,
  });

  return user;
};

export const getUser = async (userId) => {
  const user = await User.findOne({ _id: userId });
  return user;
};

export const uploadUserAvatar = async (userId, file) => {
  const avatarUrl = await saveFileToCloudinary(file);
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { avatar: avatarUrl },
    { new: true, runValidators: true },
  );

  return updatedUser;
};
