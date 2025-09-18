import { User } from '../db/models/user.js';
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

export const uploadUserPhoto = async (userId, file) => {
  const user = await getUser(userId);
  if (!user) {
    throw createHttpError(404, 'User not found!');
  }

  const filePath = await saveFile(file);

  user.avatar = filePath;

  await user.save();

  return user;
};
