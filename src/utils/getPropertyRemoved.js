export const getPropertyRemoved = (object, key) => {
  delete object[key];
  return object;
};
