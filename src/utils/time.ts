const KOREAN_TIME_INTERVAL = 9 * 60 * 60 * 1000;

export const getKoreanTime = () => {
  const current = new Date();
  const utc = current.getTime() + current.getTimezoneOffset() * 60 * 1000;
  return new Date(utc + KOREAN_TIME_INTERVAL);
};
