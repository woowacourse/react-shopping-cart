import { TimeStamp } from '../types';

export const dateFormatter = (dateStr: string) => {
  const date = new Date(dateStr);

  return date.toLocaleDateString('ko', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const priceFormatter = (priceNum: number) => {
  return `${priceNum.toLocaleString()}원`;
};

export const timeFormatter = (timeStamp: TimeStamp) => {
  const [hour, minute, second] = timeStamp.split(':').map(Number);
  const date = new Date();
  date.setHours(hour, minute, second, 0);

  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    hour12: false,
  };

  return new Intl.DateTimeFormat('ko-KR', options).format(date);
};
