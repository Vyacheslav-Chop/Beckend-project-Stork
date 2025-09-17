import { uploadUserAvatar } from '../services/user.js';

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
