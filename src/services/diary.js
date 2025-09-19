import { DiaryModel } from '../db/models/diary.js';

export const updateDiaryById = async (diaryId, userId, payload) => {
  const diary = await DiaryModel.findOneAndUpdate(
    { _id: diaryId, owner: userId },
    payload, {
    new: true,
    runValidators: true,
  })
    .populate('category');

  return diary;
};

export const deleteDiaryById = async (diaryId, owner) => {
  await DiaryModel.findOneAndDelete({
    _id: diaryId,
    owner,
  });

};

export const getDiaries = async (owner, { sortBy, order }) => {
  const sort = { [sortBy]: order === 'asc' ? 1 : -1 };
  const items = await DiaryModel.find({ owner }).sort(sort).lean();
  return items;
};

export const createDiary = async (payload) => {
  const diary = await DiaryModel.create(payload);

  return diary.populate('category');
};
