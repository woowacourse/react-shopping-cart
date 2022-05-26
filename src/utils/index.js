const addThousandUnitComma = number => {
  return number.toLocaleString();
};

const getObjectArrayValuesOfKey = (array, key) => {
  return array.map(object => object[key]);
};

export { addThousandUnitComma, getObjectArrayValuesOfKey };
