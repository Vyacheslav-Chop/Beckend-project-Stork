import { User } from '../db/models/user.js';

export const getUser = async (userId) => {
  const user = await User.findOne({ _id: userId });
  return user;
};
