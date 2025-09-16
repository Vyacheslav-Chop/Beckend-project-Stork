import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import { User } from '../db/models/user.js';
import { SessionModel } from '../db/models/session.js';
import { createSession } from '../helpers/auth.js';

export const registerUser = async (payload) => {
  const existingUser = await User.findOne({ email: payload.email });

  if (existingUser) {
    throw createHttpError(409, 'User with email already register');
  }

  const encyptedPassword = await bcrypt.hash(payload.password, 10);

  const user = await User.create({
    ...payload,
    password: encyptedPassword,
  });

  return user;
};
export const refreshUserSession = async ({ sessionId, refreshToken }) => {
  const session = await SessionModel.findOne({
    _id: sessionId,
    refreshToken,
  });
  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  const isSessionTokenExpired =
    new Date() > new Date(session.refreshTokenValidUntil);
  if (isSessionTokenExpired) {
    throw createHttpError(401, 'Session token expired');
  }

  const newSession = createSession();

  await SessionModel.deleteOne({ _id: sessionId, refreshToken });

  return await SessionModel.create({
    userId: session.userId,
    ...newSession,
  });
};
