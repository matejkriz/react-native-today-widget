// @flow
export const getTomorrowDate = (date: Date): Date =>
  new Date(date.getTime() + 24 * 60 * 60 * 1000);

export const formateDate = (date: Date): string =>
  date.toISOString().slice(0, 16);

export const getTomorrowDateRange = (date: Date): string => {
  const tomorrow = getTomorrowDate(date);
  const startDate = new Date(tomorrow.setUTCHours(9));
  const endDate = getTomorrowDate(startDate);
  return `${formateDate(startDate)},${formateDate(endDate)}`;
};
