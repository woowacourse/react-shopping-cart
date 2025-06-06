export const splitDate = (date: string) => {
  return date.split('-')[0] + `년 ` + date.split('-')[1] + `월 ` + date.split('-')[2] + `일`;
};
