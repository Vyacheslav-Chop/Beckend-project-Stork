import { isHttpError } from 'http-errors';
import { MongooseError } from 'mongoose';

export const errorHandler = async (err, req, res, next) => {
  console.log(err);

  if (isHttpError(err)) {
    return res.status(err.status).json({
      status: err.status,
      message: err.name,
      data: { message: err.message },
    });
  }

  if (err.isJoi) {
    return res.status(400).json({
      status: 400,
      message: 'Bad request',
      data: err.details.map((err) => ({
        path: err.path,
        message: err.message,
      })),
    });
  }

  if (err instanceof MongooseError) {
    return res.status(500).json({
      status: 500,
      message: 'MongooseError',
      data: err.message,
    });
  }

  res.status(500).json({
    status: 500,
    message: 'Something went wrong',
    data: err.message,
  });
};
