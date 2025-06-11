export const getIsExpiredDate = (date: string): boolean => {
  const currentDate = new Date();
  const expirationDate = new Date(`${date}T23:59:59+09:00`);
  return expirationDate < currentDate;
};
