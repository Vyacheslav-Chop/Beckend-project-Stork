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

  const session = await SessionModel.create(createSession(user._id));
  
  return { user, session };
};

export const refreshUserSession = async (refreshToken) => {
  const session = await SessionModel.findOne({ refreshToken });

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  const isSessionTokenExpired =
    new Date() > new Date(session.refreshTokenValidUntil);

  if (isSessionTokenExpired) {
    await SessionModel.findOneAndDelete({ refreshToken });
    throw createHttpError(401, 'Session token expired');
  }

  const user = await User.findById(session.userId);

  if (!user) {
    await SessionModel.findOneAndDelete({ refreshToken });
    throw createHttpError(401, 'Session not found');
  }

  await SessionModel.findOneAndDelete({ refreshToken });

  const newSession = await SessionModel.create(createSession(user._id));

  return newSession;
};

export const logoutUser = async (refreshToken) => {
  await SessionModel.deleteOne({ refreshToken });
};

export const loginUser = async (payload) => {
  const user = await User.findOne({ email: payload.email });

  if (!user) throw createHttpError(401, 'User not found');

  const isPasswordValid = await bcrypt.compare(payload.password, user.password);
  if (!isPasswordValid) throw createHttpError(401, 'Unauthorized');

  await SessionModel.deleteOne({ userId: user._id });

  return SessionModel.create(createSession(user._id));
};
