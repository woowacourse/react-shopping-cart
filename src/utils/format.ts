export const getMoneyString = (number: number | string) => {
  if (Number.isNaN(number)) {
    return '0';
  }

  return Number(number).toLocaleString('ko-KR');
};
