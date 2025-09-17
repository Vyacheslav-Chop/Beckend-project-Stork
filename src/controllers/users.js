import createHttpError from 'http-errors';
import { User } from '../db/models/user.js';

export const updateUserController = async (req, res, next) => {
    try {
        const { id } = req.user;
        const updateData = req.body;

        const updateUser = await User.findbyIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        });

        if (!updateUser) {
            throw createHttpError(404, "User not found");
        }

        res.json({
            status: 200,
            message: "User updated successfully",
            data: updatedUser,
        });
    } catch (error) {
        next(error);
    }
};