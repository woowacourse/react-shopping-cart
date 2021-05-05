export const isNumber = (number: string | number) => {
  if (isNaN(Number(number))) {
    return false;
  }

  return true;
};
