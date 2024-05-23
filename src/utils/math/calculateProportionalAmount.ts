/**
 * @example 30 -> 30% discount
 */
type Rate = number;
/**
 * @example 1000
 */
type originalAmount = number;

export const calculateProportionalAmount = (rate: Rate, originalAmount: originalAmount): number => {
  return (rate / 100) * originalAmount;
};
