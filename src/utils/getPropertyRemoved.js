export const getPropertyRemoved = (object, key) => {
  if (typeof key === 'object') {
    key.forEach((k) => {
      delete object[k];
    });

    return object;
  }

  delete object[key];

  return object;
};
