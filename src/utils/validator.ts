export const isNumeric = (value: string) => {
  return value !== '' && value.split('').every((char) => '0123456789'.includes(char));
};
