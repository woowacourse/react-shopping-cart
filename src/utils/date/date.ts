import type { Date } from "./type";

export const formatDate = (date: string) => {
  if (!validateDate(date)) throw new Error("Invalid date");

  const dateObj = new Date(date);

  return `${dateObj.getFullYear()}년 ${dateObj.getMonth() + 1}월 ${dateObj.getDate()}일`;
};

export const validateDate = (date: string): date is Date => {
  const [year, month, day] = date.split("-").map(Number);

  return year >= 2025 && month >= 1 && month <= 12 && day >= 1 && day <= 31;
};
