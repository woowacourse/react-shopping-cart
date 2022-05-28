/* eslint-disable max-depth */
import { shallowEqual } from "react-redux";

function productListEquality(arrA, arrB) {
  if (arrA.length !== arrB.length) return false;
  for (let i = 0; i < arrA.length; i += 1) {
    const keys = Object.keys(arrA[i]);
    for (let j = 0; j < keys.length; j += 1) {
      const key = keys[j];
      if (key === "thumbnail_image") {
        if (!shallowEqual(arrA[i][key], arrB[i][key])) {
          return false;
        }
      } else if (arrA[i][key] !== arrB[i][key]) {
        return false;
      }
    }
  }
  return true;
}

export default productListEquality;
