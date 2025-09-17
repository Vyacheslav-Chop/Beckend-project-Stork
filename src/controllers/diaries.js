import createHttpError from 'http-errors';
import { updateDiaryById, findPaginatedDiariesByUser } from '../services/diary.js';

export const updateDiaryByIdController = async (req, res, next) => {
  const { diaryId } = req.params;

  const diary = await updateDiaryById(diaryId, req.body);

  if (!diary) return next(createHttpError(404, 'Diery not found'));

  res.json({
    status: 200,
    message: 'Successfully updated a diary!',
    data: diary,
  });
};

export const getDiariesController = async (req, res) => {
  const userId = req.user._id;
  const { page = 1, limit = 10, sortBy = 'createdAt', order = 'desc' } = req.validatedQuery || {};

  const data = await findPaginatedDiariesByUser(userId, {
    page: Number(page),
    limit: Number(limit),
    sortBy,
    order,
  });

  res.json({
    status: 200,
    message: 'Successfully fetched diaries',
    data,
  });
};
