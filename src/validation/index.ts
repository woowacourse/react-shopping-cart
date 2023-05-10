export const isValidValue = (value: string) => {
  return /[^\d]/g.test(value);
};
