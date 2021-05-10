export const isNumber = (number: string | number) => {
  if (isNaN(Number(number))) {
    return false;
  }

  return true;
};

export const isPositiveNumber = (number: string | number) => {
  if (isNaN(Number(number))) {
    return false;
  }
  if (Number(number) <= 0) {
    return false;
  }

  return true;
};
