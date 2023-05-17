export const replaceItemIndexAt = <T>(array: T[], index: number, item: T) => [
  ...array.slice(0, index),
  item,
  ...array.slice(index + 1),
];

export const deleteItemIndexAt = <T>(array: T[], index: number) => [
  ...array.slice(0, index),
  ...array.slice(index + 1),
];
