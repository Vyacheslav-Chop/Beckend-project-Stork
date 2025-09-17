import createHttpError from 'http-errors';
import { getUser } from '../services/user.js';

export const getUserController = async (req, res) => {
  const userId = req.user._id;

  if (!userId) {
    throw createHttpError(401, 'Unauthorized');
  }

  const user = await getUser(userId);

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  res.json({
    status: 200,
    message: 'Successfully found user!',
    id: user._id,
    username: user.username,
    email: user.email,
  });
};
