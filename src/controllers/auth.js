import { setupSession } from '../helpers/auth.js';
import {
  loginUser,
  refreshUserSession,
  registerUser,
  logoutUser,
} from '../services/auth.js';

export const registerUserController = async (req, res) => {
  const { user, session } = await registerUser(req.body);

  setupSession(res, session);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: user,
  });
};

export const loginUserController = async (req, res) => {
  const session = await loginUser(req.body);

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
  });
};

export const refreshUserSessionController = async (req, res) => {
  const session = await refreshUserSession(req.cookies.refreshToken);

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully refreshed a session!',
  });
};

export const logoutUserController = async (req, res) => {
 const { refreshToken, accessToken } = req.cookies;

 if (refreshToken) {
   await logoutUser(refreshToken);
 }
 res.clearCookie('refreshToken', {
   httpOnly: true,
   secure: process.env.NODE_ENV === 'production',
   sameSite: 'lax',
   path: '/',
 });

 if (accessToken) {
   res.clearCookie('accessToken', {
     httpOnly: true,
     secure: process.env.NODE_ENV === 'production',
     sameSite: 'lax',
     path: '/',
   });
 }

  res.status(204).send();
};
