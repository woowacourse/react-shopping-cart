export const isTypeOfSet = (value: unknown): value is Set<unknown> => {
  return Object.prototype.toString.call(value) === '[object Set]';
};
