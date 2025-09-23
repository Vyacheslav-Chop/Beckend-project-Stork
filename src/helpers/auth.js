// import { randomBytes } from 'node:crypto';
// import { FIFTEEN_MINUTES, THIRTY_DAYS } from '../constants/constants.js';

// export const createSession = (userId) => {
//   const accessToken = randomBytes(30).toString('base64');
//   const refreshToken = randomBytes(30).toString('base64');

//   return {
//     accessToken,
//     refreshToken,
//     accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
//     refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAYS),
//     userId,
//   };
// };

// export const setupSession = (res, session) => {
//   res.cookie('refreshToken', session.refreshToken, {
//     httpOnly: true,
//     expires: new Date(Date.now() + THIRTY_DAYS),
//   });

//   res.cookie('sessionId', session._id, {
//     httpOnly: true,
//     expires: new Date(Date.now() + THIRTY_DAYS),
//   });
// };

import jwt from 'jsonwebtoken';
import { randomBytes } from 'node:crypto';
import { FIFTEEN_MINUTES, THIRTY_DAYS } from '../constants/constants.js';
import { getEnvVar } from '../utils/getEnvVar.js';

const JWT_SECRET = getEnvVar('JWT_SECRET');

export const createSession = (userId) => {
  const accessToken = jwt.sign({ sub: userId }, JWT_SECRET, {
    expiresIn: '15m',
  });

  const refreshToken = randomBytes(48).toString('base64url');

  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAYS),
    userId,
  };
};

export const setupSession = (res, session) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    expires: session.refreshTokenValidUntil,
  });
};
