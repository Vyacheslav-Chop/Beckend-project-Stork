import createHttpError from 'http-errors';
import { updateDiaryById } from '../services/diary.js';

export const updateDiaryByIdController = async (req, res, next) => {
  const { diaryId } = req.params;

  const diary = await updateDiaryById(diaryId, req.body);

  if (!diary) return next(createHttpError(404, 'Diery not found'));

  res.json({
    status: 200,
    message: 'Successfully updated a diary',
    data: diary,
  });
};
