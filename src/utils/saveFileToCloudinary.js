import fs from 'node:fs/promises';
import createHttpError from 'http-errors';
import cloudinary from 'cloudinary';
import { getEnvVar } from './getEnvVar.js';
import { CLOUDINARY } from '../constants/constants.js';

cloudinary.v2.config({
  secure: true,
  cloud_name: getEnvVar(CLOUDINARY.CLOUDINARY_API_CLOUD_NAME),
  api_key: getEnvVar(CLOUDINARY.CLOUDINARY_API_KEY),
  api_secret: getEnvVar(CLOUDINARY.CLOUDINARY_API_SECRET),
});

export const saveFileToCloudinary = async (file) => {
  try {
    const res = await cloudinary.v2.uploader.upload(file.path);
    await fs.unlink(file.path);

    return res.secure_url;
  } catch (err) {
    console.error(err);
    throw createHttpError(500, 'Failed to save file to Cloudinary');
  }
};
