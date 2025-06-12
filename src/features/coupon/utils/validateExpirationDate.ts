export const validateExpirationDate = (currentDate: Date, couponDate: string) => {
  const currentDateWithYearMonthDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate()
  );
  const couponExpirationDate = new Date(couponDate);
  return currentDateWithYearMonthDate <= couponExpirationDate;
};
