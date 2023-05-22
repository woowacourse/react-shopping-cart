import { removeCartItem } from "api/cartItems";
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

  const removeCheckedItem = async () => {
    const checkedList = cartList.filter((item) => item.isChecked);
    const removedList = checkedList.filter((item) => removeItem(item.id));

    const newList = cartList.filter((item) => {
      const isRemoved = !!removedList.find((removedItem) => removedItem.id === item.id);

      return !isRemoved;
    });

    setCartList(newList);
  };

  const removeItem = async (id: number) => {
    const result = await removeCartItem(id);

    if (!result) {
      alert(`장바구니 상품 제거 실패! ${cartList.find((item) => item.id === id)}`);
      return false;
    }

    return true;
  };

  return { isAllchecked, checkedCount, setAllCheckbox, removeCheckedItem };
};
