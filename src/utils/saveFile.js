import createHttpError from 'http-errors';
import { saveFileToCloudinary } from './saveFileToCloudinary.js';

export const saveFile = async (file) => {
  try {
    return await saveFileToCloudinary(file);
  } catch (err) {
    console.error(err);
    throw new createHttpError(500, 'Failed to save file to Cloudinary');
  }
};
