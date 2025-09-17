import createHttpError from 'http-errors';
import { updateUserById } from '../services/user.js';

export const updateUserByIdController = async (req, res, next) => {
    const { userId } = req.params;

    const user = await updateUserById(userId, req.body);

    if (!user) {
        return next(createHttpError(404, "User not found"));
    }

    res.json({
        status: 200,
        message: "User updated successfully",
        data: updateUser,
    });
};