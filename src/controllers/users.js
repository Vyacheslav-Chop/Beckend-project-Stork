
import createHttpError from 'http-errors';
import { getUser } from '../services/user.js';
import { uploadUserAvatar } from '../services/user.js';

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
    data: user,
  });
};


export const uploadUserPhotoController = async (req, res) => {
  const { user } = req;
  const file = req.file;

  const updatedUser = await uploadUserAvatar(user._id, file);

  res.json({
    status: 200,
    message: 'Successfully updated avatar!',
    data: updatedUser,
  });
};
