const addThousandUnitComma = number => {
  return number.toLocaleString();
};

const findElementIndex = (array, key, value) => {
  return array.findIndex(elem => elem[key] === value);
};

const getObjectArrayValuesOfKey = (array, key) => {
  return array.map(object => object[key]);
};

const removeElement = (array, id) => {
  return array.filter(elem => elem.id !== id);
};

const updateObject = (oldObject, newValues) => {
  return Object.assign({}, oldObject, newValues);
};

export {
  addThousandUnitComma,
  findElementIndex,
  getObjectArrayValuesOfKey,
  removeElement,
  updateObject,
};
