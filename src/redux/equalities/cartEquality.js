import { shallowEqual } from "react-redux";

function cartEquality(objA, objB) {
  if (!shallowEqual(objA, objB)) return false;

  const innerObjA = objA[Object.keys(objA)[0]];
  const innerObjB = objB[Object.keys(objB)[0]];

  return shallowEqual(innerObjA, innerObjB);
}

export default cartEquality;
