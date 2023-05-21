import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { cartListState } from "recoil/cart";

export const useCartCheckbox = () => {
  const [cartList, setCartList] = useRecoilState(cartListState);
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
    cartList
      .filter((item) => item.isChecked)
      .forEach((item) => {
        fetch(`/cart-items/${item.id}`, {
          method: "DELETE",
        }).catch((err) => {
          console.log(`장바구니 상품 제거 실패: ${err instanceof Error ? err.message : ""}`);
        });
      });

    setCartList(cartList.filter((item) => !item.isChecked));
  };

  return { isAllchecked, checkedCount, setAllCheckbox, removeCheckedItem };
};
