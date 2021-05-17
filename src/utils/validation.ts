export const isNumber = (number: string | number) => {
  return !isNaN(Number(number));
};

export const isPositiveNumber = (number: string | number) => {
  return isNumber(number) && Number(number) > 0;
};
