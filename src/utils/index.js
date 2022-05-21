const addThousandUnitComma = number => {
  return number.toLocaleString();
};

const getObjectArrayValues = (array, key) => {
  return array.map(object => object[key]);
};

export { addThousandUnitComma, getObjectArrayValues };
