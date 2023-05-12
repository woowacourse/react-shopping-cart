export const changeInvalidValueToBlank = (value: string, regex: RegExp) => {
  return value.replace(regex, '').slice(0, 2);
};
