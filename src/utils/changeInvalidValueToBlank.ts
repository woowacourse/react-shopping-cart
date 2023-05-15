type Condition = RegExp;

export const changeInvalidValueToBlank = (value: string, regex: Condition) => {
  return Number(value.replace(regex, '').slice(0, 2));
};
