const default_week = 20;
const max_weeks = 42;

export const calculateCurrentWeek = (user, weekFromQuery) => {
  if (weekFromQuery && weekFromQuery >= 1 && weekFromQuery <= max_weeks) {
    return weekFromQuery;
  }

  if (user.dueDate) {
    const today = new Date();
    const dueDate = new Date(user.dueDate);
    const daysLeft = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
    const weeksLeft = Math.floor(daysLeft / 7);
    const currentWeek = max_weeks - weeksLeft;

    return Math.max(1, Math.min(currentWeek, max_weeks));
  }

  return user.week || default_week;
};

export const calculateDaysToBirth = (currentWeek, dueDate) => {
  if (dueDate) {
    const today = new Date();
    const endDate = new Date(dueDate);
    return Math.max(0, Math.ceil((endDate - today) / (1000 * 60 * 60 * 24)));
  }

  return (max_weeks - currentWeek) * 7;
};
