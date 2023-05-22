import { useState } from "react";
import { useRecoilState } from "recoil";
import { cartListState } from "../atoms";
import { deleteCartItem } from "../utils/apis";

export const useCartList = () => {
  const [cartList, setCartList] = useRecoilState(cartListState);
  const [selectedItemIds, setSelectedItemIds] = useState<number[]>(cartList.map((item) => item.id));

  const isSelected = (id: number) => {
    return selectedItemIds.includes(id);
  };

  const isAllSelected = () => {
    return cartList.length === selectedItemIds.length;
  };

  const toggleSelectedItem = (id: number) => {
    if (selectedItemIds.includes(id)) {
      setSelectedItemIds((current) => current.filter((item) => item !== id));
      return;
    }

    setSelectedItemIds((current) => [...current, id]);
  };

  const toggleAllItem = () => {
    if (isAllSelected()) {
      setSelectedItemIds([]);
      return;
    }

    setSelectedItemIds(cartList.map((item) => item.id));
  };

  const removeItemFromCartList = (id: number) => {
    setCartList((current) => current.filter((item) => item.id !== id));
    setSelectedItemIds((current) => current.filter((item) => item !== id));
    deleteCartItem(id);
  };

  const deleteSelectedItems = () => {
    if (selectedItemIds.length === 0 || !window.confirm("선택한 목록을 장바구니에서 정말 삭제할까요?")) return;

    selectedItemIds.forEach((id) => deleteCartItem(id));
    setCartList((current) => current.filter((item) => !selectedItemIds.includes(item.id)));
    setSelectedItemIds([]);
  };

  const totalPrice = cartList
    .filter((item) => selectedItemIds.includes(item.id))
    .reduce((pre, curr) => {
      return pre + curr.product.price * curr.quantity;
    }, 0);

  return {
    isSelected,
    isAllSelected,
    toggleSelectedItem,
    toggleAllItem,
    removeItemFromCartList,
    deleteSelectedItems,
    totalPrice,
    cartList,
    selectedItemIds,
  };
};
