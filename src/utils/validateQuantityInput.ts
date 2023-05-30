export const validateQuantityInput = (value: number) => {
  return value >= 0 && value <= 99;
};
