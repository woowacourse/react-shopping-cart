export const toggleArrayItems = (array: number[], item: number) => {
  if (array.includes(item)) return array.filter((x) => x !== item);
  return [...array, item];
};
