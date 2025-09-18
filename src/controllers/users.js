import createHttpError from 'http-errors';
import { uploadUserPhoto, getUser, updateUserById } from '../services/user.js';

export const updateUserByIdController = async (req, res, next) => {
  const { userId } = req.params;

  const user = await updateUserById(userId, req.body);

  if (!user) {
    return next(createHttpError(404, 'User not found'));
  }

  res.json({
    status: 200,
    message: 'User updated successfully',
    data: user,
  });
};

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
  const user = await uploadUserPhoto(req.user._id, req.file);
  res.send({
    status: 200,
    message: 'Successfully uploaded a photo for the user!',
    data: user,
  });
};
