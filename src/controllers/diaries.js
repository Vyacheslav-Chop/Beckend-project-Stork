import createHttpError from 'http-errors';
import {
  updateDiaryById,
  getDiaries,
  createDiaryController,
} from '../services/diary.js';

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

export const getDiariesController = async (req, res, next) => {
  const userId = req.user._id;
  const { sortBy = 'createdAt', order = 'desc' } = req.validatedQuery || {};

  const diaries = await getDiaries(userId, { sortBy, order });

  if (!diaries || diaries.length === 0) {
    return next(createHttpError(404, 'Diaries not found'));
  }

  res.json({
    status: 200,
    message: 'Successfully fetched diaries',
    data: diaries,
  });
};

export const createDiaryController = async (req, res, next) => {
  const userId = req.user._id;
  const diary = await createDiary(req.body, userId);

  res.status(201).json({
    status: 201,
    message: 'Diary created successfully',
    data: diary,
  });
};
