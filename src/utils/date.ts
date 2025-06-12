import { AvailableTimeType } from "../components/Coupon/types";

export const isNowInRange = (
  start: AvailableTimeType,
  end: AvailableTimeType
) => {
  const now = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const startMinutes = start.hour * 60 + start.minute;
  const endMinutes = end.hour * 60 + end.minute;

  return startMinutes <= nowMinutes && endMinutes >= nowMinutes;
};
