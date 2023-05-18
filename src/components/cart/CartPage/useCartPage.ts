import { useEffect, useState } from 'react';
import useCartService from '../../../hooks/useCartService';
import type { CartItem } from '../../../types/product';

const useCartPage = () => {
  const { cart, removeAllProductsFromCart } = useCartService();
  const [checkedItemIds, setCheckedItemIds] = useState(
    cart.map((cartItem) => cartItem.id),
  );
  const isAllChecked = cart.length > 0 && checkedItemIds.length === cart.length;

  const calcTotalPrice = () => {
    const checkedItems = cart.filter((cartItem) =>
      checkedItemIds.includes(cartItem.id),
    );

    return checkedItems.reduce(
      (prev, item) => prev + item.product.price * item.quantity,
      0,
    );
  };

  const handleCheckboxChange = (clickedItemId: CartItem['id']) => {
    if (checkedItemIds.includes(clickedItemId)) {
      setCheckedItemIds((prev) => prev.filter((id) => id !== clickedItemId));
    } else {
      setCheckedItemIds((prev) => [...prev, clickedItemId]);
    }
  };

  const handleAllCheckboxChange = () => {
    if (isAllChecked) {
      setCheckedItemIds(() => []);
    } else {
      setCheckedItemIds(() => cart.map((cartItem) => cartItem.id));
    }
  };

  const handleSelectedItemDelete = () => {
    removeAllProductsFromCart(checkedItemIds);
  };

  useEffect(() => {
    const cartItemIds = cart.map((cartItem) => cartItem.id);

    setCheckedItemIds((prev) =>
      prev.filter((checkedItemId) => cartItemIds.includes(checkedItemId)),
    );
  }, [cart]);

  return {
    cart,
    checkedItemIds,
    isAllChecked,
    calcTotalPrice,
    handleCheckboxChange,
    handleAllCheckboxChange,
    handleSelectedItemDelete,
  } as const;
};
export default useCartPage;
