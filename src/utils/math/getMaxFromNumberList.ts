export const getMaxNumberFromList = (list: number[]): number => {
  return list.length === 0 ? 0 : Math.max(...list);
};
