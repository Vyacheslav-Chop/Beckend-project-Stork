import { User } from '../db/models/user.js';

export const updateUserById = async (userId, payload) => {
    const user = await User.findOneAndUpdate({ _id: userId }, payload, {
        new: true,
        runValidators: true,
    })

    return user;
};