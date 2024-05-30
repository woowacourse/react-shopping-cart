/**
 * @example "2023-05-22"
 */
type DateString = string;

export const isPastDate = (date: DateString, currentDate: Date = new Date()): boolean => {
  return new Date(date) < currentDate;
};
