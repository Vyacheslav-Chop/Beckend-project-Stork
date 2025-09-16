import createHttpError from 'http-errors';
import { session } from '../db/models/session.js';
import { user } from '../db/models/user.js';

export const authenticate = async (req, res, next) => {
    const authHeader = req.get('Authorization');

    if (!authHeader) {
        next(createHttpError(401, 'Please provide Authorization header'));
        return;
    }

    const bearer = authHeader.split(' ')[0];
    const token = authHeader.split(' ')[1];

    if (bearer !== 'Bearer' || !token) {
        next(createHttpError(401, 'Auth header should be of type Bearer'));
        return;
    }

    const sessionAuth = await session.findOne({
        accessToken: token
    });

    if (!sessionAuth) {
        next(createHttpError(401, 'Session not found'));
        return;
    }

    const isAccessTokenExpired =
        new Date() > new Date(sessionAuth.accessTokenValidUntil);

    if (isAccessTokenExpired) {
        next(createHttpError(401, 'Access token expired'));
        return;
    }

    const userAuth = await user.findById(sessionAuth.userId);

    if (!userAuth) {
        next(createHttpError(401));
        return;
    }

    req.user = userAuth;

    next();
};
