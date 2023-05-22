import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { selectedProductsState } from "../recoil/atom";
import { cartProductsSelector } from "../recoil/selector";
import { ProductListType } from "../types/domain";

export const useCheckBox = () => {
  const cartProducts = useRecoilValue<ProductListType>(cartProductsSelector);
  const setSelectedProducts = useSetRecoilState(selectedProductsState);
  const [checkedArray, setCheckedArray] = useState(
    [...Array(cartProducts.length)].map(() => true)
  );

  useEffect(() => {
    setSelectedProducts(
      cartProducts.filter(
        (cartProduct, index) => checkedArray[index] && cartProduct
      )
    );
  }, [cartProducts, checkedArray, setSelectedProducts]);

  const getAllChecked = () => {
    return checkedArray.every((checked) => checked);
  };

  const handleCheckBox = (changedIndex: number) => () => {
    setCheckedArray((prev) =>
      prev.map((checked, index) =>
        changedIndex === index ? !checked : checked
      )
    );
  };

  const handleAllCheckBox = () => {
    setCheckedArray((prev) => prev.map(() => !getAllChecked()));
  };

  const removeCheckedArray = () => {
    setCheckedArray((prev) => prev.filter((checked) => !checked));
  };

  const removeTargetIndex = (targetIndex: number) => {
    checkedArray.splice(targetIndex, 1);
    setCheckedArray(checkedArray);
  };

  const allChecked = getAllChecked();

  return {
    checkedArray,
    allChecked,
    removeCheckedArray,
    removeTargetIndex,
    handleCheckBox,
    handleAllCheckBox,
  };
};
