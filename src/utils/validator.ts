export const isNumeric = (value: string) => {
  if (!value || value.trim() === '') return false;

  return /^\d+$/.test(value);
};
