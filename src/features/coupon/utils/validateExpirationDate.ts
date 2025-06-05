export const validateExpirationDate = (couponDate: string) => {
  const today = new Date();
  const currentDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const couponExpirationDate = new Date(couponDate);
  return currentDate <= couponExpirationDate;
};
