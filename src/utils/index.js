export function removeProperty(object, property) {
  return Object.keys(object).reduce((accObject, key) => {
    if (key === property) return accObject;
    accObject[key] = object[key];
    return accObject;
  }, {});
}
