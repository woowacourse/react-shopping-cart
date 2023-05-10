export const isNumber = (value: string) => {
  const regex = /^\d*$/;
  return regex.test(value);
};
