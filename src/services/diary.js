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
