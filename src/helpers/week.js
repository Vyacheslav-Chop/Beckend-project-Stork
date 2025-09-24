const default_week = 20;
const max_weeks = 42;

export function calculateCurrentWeek(dueDate) {
  if (!dueDate) return default_week;

  let parsedDate;

  if (typeof dueDate === 'string') {
    const [year, month, day] = dueDate.split('.').map(Number);
    parsedDate = new Date(year, month - 1, day);
  } else {
    parsedDate = new Date(dueDate);
  }

  if (isNaN(parsedDate.getTime())) return 0;

  const conceptionDate = new Date(parsedDate);
  conceptionDate.setDate(conceptionDate.getDate() - 280);

  const today = new Date();
  const diffInMs = today.getTime() - conceptionDate.getTime();

  const diffInWeeks = Math.ceil(diffInMs / (1000 * 60 * 60 * 24 * 7));

  return diffInWeeks > 0 ? diffInWeeks : 0;
}

export const calculateDaysToBirth = (currentWeek, dueDate) => {
  if (dueDate) {
    const today = new Date();
    const endDate = new Date(dueDate);
    return Math.max(0, Math.ceil((endDate - today) / (1000 * 60 * 60 * 24)));
  }

  return (max_weeks - currentWeek) * 7;
};

export const calculateFiveWeeksLater = () => {
  const today = new Date();
  const fiveWeeksLater = new Date(
    today.getTime() + 7 * 5 * 24 * 60 * 60 * 1000,
  );

  const diffInMs = fiveWeeksLater.getTime() - today.getTime();
  const publicWeek = Math.ceil(diffInMs / (1000 * 60 * 60 * 24 * 7));

  return publicWeek;
};
