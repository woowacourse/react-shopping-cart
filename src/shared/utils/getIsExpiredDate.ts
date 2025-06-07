export const getIsExpiredDate = (date: string): boolean => {
  const currentDate = new Date();
  const expirationDate = new Date(date);
  return expirationDate < currentDate;
};
