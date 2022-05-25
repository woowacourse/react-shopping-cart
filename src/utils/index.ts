export const formatDecimal = (input: number) => {
  return input.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
};
