import { DiaryModel } from '../db/models/diary.js';

export const updateDiaryById = async (diaryId, payload) => {
  const diary = await DiaryModel.findOneAndUpdate({ _id: diaryId }, payload, {
    new: true,
    runValidators: true,
  })
    .populate('category')
    .populate('userId');

  return diary;
};
export const deleteDiaryById = async (diaryId, userId) => {
  const diary = await DiaryModel.findOneAndDelete({
    _id: diaryId,
    userId,
  });
  return diary;
};
