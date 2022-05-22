const addThousandUnitComma = number => {
  return number.toLocaleString();
};

const getObjectArrayValuesOfKey = (array, key) => {
  return array.map(object => object[key]);
};

const getObjectArrayIdxOfValue = (array, { key, value }) => {
  const values = getObjectArrayValuesOfKey(array, key);

  return values.indexOf(value);
};

const isArrayIncludesObject = (array, { key, value }) => {
  const objectIdx = getObjectArrayIdxOfValue(array, { key, value });

  return objectIdx !== -1;
};

export {
  addThousandUnitComma,
  getObjectArrayValuesOfKey,
  getObjectArrayIdxOfValue,
  isArrayIncludesObject,
};
