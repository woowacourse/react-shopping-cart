import { cartListState, filteredCartItemState } from "@/store/atoms/atoms";
import { deleteCartItem, patchCartItem } from "@/api/cartItem";

import { useRecoilState } from "recoil";
import { useState } from "react";

const useHandleCartItem = (id: number) => {
  const [filteredItemState, setFilteredItemState] = useRecoilState(
    filteredCartItemState(id)
  );

  const [cartList, setCartList] = useRecoilState(cartListState);
  const [quantityLoading, setQuantityLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleSelect = () => {
    const newValue = { ...filteredItemState };
    newValue.isSelected = !newValue.isSelected;
    setFilteredItemState(newValue);
  };

  const handleDelete = () => {
    const deleteData = async () => {
      setDeleteLoading(true);

      await deleteCartItem(id);
      const newList = cartList.filter((item) => item.id !== id);
      setCartList(newList);

      setDeleteLoading(false);
    };

    deleteData();
  };

  const handleQuantity = (quantity: number) => {
    const patchData = async () => {
      setQuantityLoading(true);

      await patchCartItem(id, quantity);
      const newValue = { ...filteredItemState, quantity };
      setFilteredItemState(newValue);

      setQuantityLoading(false);
    };

    if (quantity > 0) patchData();
  };

  return {
    filteredItemState,
    quantityLoading,
    deleteLoading,
    handleSelect,
    handleDelete,
    handleQuantity,
  };
};

export default useHandleCartItem;
