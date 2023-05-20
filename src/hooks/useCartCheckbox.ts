import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { CartProductList } from "recoil/selector";

export const useCartCheckbox = () => {
  const [cartList, setCartList] = useRecoilState(CartProductList);
  const [isAllchecked, setIsAllChecked] = useState(true);
  const [checkedCount, setCheckedCount] = useState(cartList.length);

  useEffect(() => {
    const count = cartList.filter((item) => item.isChecked).length;

    setIsAllChecked(count === cartList.length);
    setCheckedCount(count);
  }, [cartList]);

  const setAllCheckbox = (isChecked: boolean) => {
    setCartList(
      cartList.map((item) => {
        return { ...item, isChecked: isChecked };
      })
    );
  };

  const removeCheckedItem = () => {
    setCartList(cartList.filter((item) => !item.isChecked));
  };

  return { isAllchecked, checkedCount, setAllCheckbox, removeCheckedItem };
};
