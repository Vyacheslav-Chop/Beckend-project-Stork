import { User } from '../db/models/user.js';

export const getUser = async (userId) => {
  return await User.findById(userId).select('_id username email');
};
