export const toKoreanDate = (stringDate: string) => {
  const date = new Date(stringDate);
  return `${date.getFullYear()}년 ${date.getMonth()}월 ${date.getDate()}일`;
};

export const toKoreanTime = (stringTime: string) => {
  const timeArray = stringTime.split(':').map((time) => Number(time));
  const hour =
    timeArray[0] > 12
      ? `오후 ${timeArray[0] - 12}시`
      : `오전 ${timeArray[0]}시`;
  const minute = timeArray[1] ? `${timeArray[1]}분` : '';
  const second = timeArray[2] ? `${timeArray[2]}초` : '';

  return `${hour}${minute}${second}`;
};
