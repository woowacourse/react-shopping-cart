export const isEqual = (array1: unknown[], array2: unknown[]) => {
  return array1.length === array2.length && array1.every((item, index) => item === array2[index]);
};
