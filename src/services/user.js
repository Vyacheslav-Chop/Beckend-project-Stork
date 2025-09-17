import { User } from '../db/models/user.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

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
