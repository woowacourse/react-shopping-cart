export const isNaturalNumberString = (string: string) => {
  return string !== '' && string.split('').every((char) => '0123456789'.includes(char));
};
