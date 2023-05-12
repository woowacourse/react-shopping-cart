export const isNumericString = (value: string) => {
  const regex = /^\d*$/;

  return regex.test(value);
};
