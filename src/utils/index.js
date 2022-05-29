export const findByIdInObjectArray = (objectArray, id) =>
  objectArray.find((object) => object.id === id);
export const isContainedInObjectArray = (objectArray, id) =>
  objectArray.findIndex((object) => object.id === id) !== -1;
