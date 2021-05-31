export const getMoneyString = (number: number | string) => {
  if (Number.isNaN(number)) {
    return '0';
  }

  return Number(number).toLocaleString('ko-KR');
};

export const getPageIndex = (itemLength: number, sliceUnit: number) => {
  if (itemLength % sliceUnit === 0) {
    return itemLength / sliceUnit;
  }

  return Math.floor(itemLength / sliceUnit) + 1;
};
