import { AvailableTime } from "../../types/coupon";

function validateDate(expirationDate: string, today: Date) {
  return new Date(expirationDate) >= today;
}

function validateTime(availableTime: AvailableTime, today: Date) {
  const { start, end } = availableTime;

  return (
    today.getHours() >= getHours(start) &&
    today.getHours() <= getHours(end) &&
    today.getMinutes() >= getMinutes(start) &&
    today.getMinutes() <= getMinutes(end)
  );
}

const getHours = (time: string) => {
  return Number(time.split(":")[0]);
};

const getMinutes = (time: string) => {
  return Number(time.split(":")[1]);
};

function validateMinimumAmount(minimumAmount: number, totalPrice: number) {
  return totalPrice >= minimumAmount;
}

export { validateDate, validateMinimumAmount, validateTime };
