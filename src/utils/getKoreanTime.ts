const getKoreanTime = () => {
  const now = new Date();
  const GMTNow = now.getTime() + now.getTimezoneOffset() * 60 * 1000;

  const koreanTimeDiff = 9 * 60 * 60 * 1000;

  return new Date(GMTNow + koreanTimeDiff);
};

export default getKoreanTime;
