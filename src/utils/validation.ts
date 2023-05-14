const regEx = {
  Number: /^[0-9]+$/,
};

export const isNumber = (target: string) => {
  return regEx.Number.test(target);
};
