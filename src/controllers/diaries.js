import createHttpError from 'http-errors';
import {
  deleteDiaryById,
  updateDiaryById,
  getDiaries,
  createDiary,
} from '../services/diary.js';

export const updateDiaryByIdController = async (req, res, next) => {
  const { diaryId } = req.params;

  const diary = await updateDiaryById(diaryId, req.user._id, req.body);

  if (!diary) throw createHttpError(
    403,
    'You do not have permission to access this contact',
  );

  res.json({
    status: 200,
    message: 'Successfully updated a diary!',
    data: diary,
  });
};

export const deleteDiaryByIdController = async (req, res, next) => {
  const { diaryId } = req.params;
  const owner = req.user._id;
  const diary = await deleteDiaryById(diaryId, owner);

  if (!diary) return next(createHttpError(404, 'Diary not found'));

  res.status(204).send();
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
  const diary = await createDiary({
    ...req.body,
    owner: req.user._id,
  });

  res.status(201).json({
    status: 201,
    message: 'Diary created successfully',
    data: diary,
  });
};
