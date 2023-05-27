import { REGEX } from '../constant';

export const formatPrice = (number: number) => {
  return number.toString().replace(REGEX.groupByThreeDigit, ',');
};
