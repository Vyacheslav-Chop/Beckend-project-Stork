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

export const deleteDiaryById = async (diaryId, owner) => {
  const diary = await DiaryModel.findOneAndDelete({
    _id: diaryId,
    owner,
  });
  return diary;
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
