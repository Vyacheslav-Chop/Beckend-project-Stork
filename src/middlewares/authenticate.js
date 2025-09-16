import createHttpError from 'http-errors';
import { SessionModel } from '../db/models/session.js'
import { User } from '../db/models/user.js';

export const authenticate = async (req, res) => {
    const authHeader = req.get('Authorization');

    if (!authHeader) {
        next(createHttpError(401, 'Please provide Authorization header'));
        return;
    }

    const bearer = authHeader.split(' ')[0];
    const token = authHeader.split(' ')[1];

    if (bearer !== 'Bearer' || !token) {
        throw (createHttpError(401, 'Auth header should be of type Bearer'));
    }

    const session = await SessionModel.findOne({
        accessToken: token
    });

    if (!session) {
        throw (createHttpError(401, 'Session not found'));
    }

    const isAccessTokenExpired =
        new Date() > new Date(SessionModel.accessTokenValidUntil);

    if (isAccessTokenExpired) {
        throw (createHttpError(401, 'Access token expired'));

    }

    const user = await User.findById(session.userId);

    if (!user) {
        await SessionModel.findByIdAndDelete(session._id);
        throw createHttpError(401, 'User, associated with session, not found');
    }

    req.user = user;

    next();
};
