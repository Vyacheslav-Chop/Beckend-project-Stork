import jwt from 'jsonwebtoken';
import { FIFTEEN_MINUTES, THIRTY_DAYS } from '../constants/constants.js';
import { getEnvVar } from '../utils/getEnvVar.js';

const JWT_ACCESS_SECRET = getEnvVar('JWT_ACCESS_SECRET');
const JWT_REFRESH_SECRET = getEnvVar('JWT_REFRESH_SECRET');

export const createSession = (userId) => {
  const accessToken = jwt.sign({ sub: userId }, JWT_ACCESS_SECRET, {
    expiresIn: '15m',
  });

  const refreshToken = jwt.sign({ sub: userId }, JWT_REFRESH_SECRET, {
    expiresIn: '30d',
  });

  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAYS),
    userId,
  };
};

export const setupSession = (res, session) => {
  res.cookie('accessToken', session.accessToken, {
    httpOnly: true,
    secure: true,
    expires: session.accessTokenValidUntil,

  });

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    secure: true,
    expires: session.refreshTokenValidUntil,
  });
};
