import { Time } from "./type";

export function formatTime(time: string): string {
  if (!validateTime(time)) throw new Error("Invalid time");

  const [hour, minute] = time.split(":").map(Number);

  const isAm = hour < 12;
  const hour12 = hour % 12 || 12;

  return `${isAm ? "오전" : "오후"} ${hour12}시 ${minute.toString().padStart(2, "0")}분`;
}

export const getTime = (time: string) => {
  if (!validateTime(time)) throw new Error("Invalid time");

  const [hour, minute, second] = time.split(":").map(Number);

  return {
    hour,
    minute,
    second,
  };
};

export const validateTime = (time: string): time is Time => {
  const [hour, minute, second] = time.split(":").map(Number);

  return hour >= 0 && hour <= 23 && minute >= 0 && minute <= 59 && second >= 0 && second <= 59;
};
