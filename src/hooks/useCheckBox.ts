import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { selectedProductsState } from "../recoil/atom";
import { ProductListType } from "../types/domain";

export const useCheckBox = (cartProducts: ProductListType) => {
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
  }, [checkedArray]);

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

  const allChecked = getAllChecked();

  return { checkedArray, allChecked, handleCheckBox, handleAllCheckBox };
};
