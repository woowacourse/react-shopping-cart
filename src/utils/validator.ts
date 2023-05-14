export const isIntegerInput = (input: string) => {
  return /^[0-9]*$/.test(input);
};

export const convertToBoundaryValueIfNotValidRange = (min: number, max: number, value: number) => {
  if (value < min) return min;
  if (value > max) return max;
  return value;
};
