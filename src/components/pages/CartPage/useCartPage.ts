import { useEffect, useState } from 'react';
import useCartService from '../../../hooks/useCartService';
import type { CartItem } from '../../../types/product';

const useCartPage = () => {
  const { cart, removeAllProductsFromCart } = useCartService();
  const [checkedItemIds, setCheckedItemIds] = useState(
    new Set(cart.map((cartItem) => cartItem.id)),
  );
  const isAllChecked = cart.length > 0 && checkedItemIds.size === cart.length;

  const calcTotalPrice = () => {
    const checkedItems = cart.filter((cartItem) =>
      checkedItemIds.has(cartItem.id),
    );

    return checkedItems.reduce(
      (prev, item) => prev + item.product.price * item.quantity,
      0,
    );
  };

  const handleCheckboxChange = (clickedItemId: CartItem['id']) => {
    const nextIds = new Set(checkedItemIds);

    if (checkedItemIds.has(clickedItemId)) {
      nextIds.delete(clickedItemId);
    } else {
      nextIds.add(clickedItemId);
    }

    setCheckedItemIds(nextIds);
  };

  const handleAllCheckboxChange = () => {
    if (isAllChecked) {
      setCheckedItemIds(() => new Set());
    } else {
      setCheckedItemIds(() => new Set(cart.map((cartItem) => cartItem.id)));
    }
  };

  const handleSelectedItemDelete = () => {
    const selectedProductIds = cart
      .filter((cartItem) => checkedItemIds.has(cartItem.id))
      .map((cartItem) => cartItem.product.id);

    removeAllProductsFromCart(selectedProductIds);
  };

  useEffect(() => {
    const cartItemIds = cart.map((cartItem) => cartItem.id);
    const nextIds = Array.from(checkedItemIds).filter((checkedItemId) =>
      cartItemIds.includes(checkedItemId),
    );

    setCheckedItemIds(new Set(nextIds));
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
