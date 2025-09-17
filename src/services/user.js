import { User } from '../db/models/user.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

export const uploadUserAvatar = async (userId, file) => {
  const avatarUrl = await saveFileToCloudinary(file);
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { avatar: avatarUrl },
    { new: true, runValidators: true },
  );

  return updatedUser;
};
