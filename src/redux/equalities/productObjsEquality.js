import { shallowEqual } from "react-redux";

function productObjsEquality(objA, objB) {
  return (
    shallowEqual(objA, objB) &&
    shallowEqual(objA.thumbnail_image, objB.thumbnail_image)
  );
}

export default productObjsEquality;
