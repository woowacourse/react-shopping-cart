import { shallowEqual } from "react-redux";

function productListEquality(arrA, arrB) {
  if (arrA.length !== arrB.length) return false;
  for (let i = 0; i < arrA.length; i += 1) {
    if (!shallowEqual(arrA[i], arrB[i])) {
      return false;
    }
    if (!shallowEqual(arrA[i].thumbnail_image, arrB[i].thumbnail_image)) {
      return false;
    }
  }
  return true;
}

export default productListEquality;
