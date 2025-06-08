import { useCartData } from './useCartData';
import { useCartSelection } from './useCartSelection';
import { useCartCalculations } from './useCartCalculations';
import { useCartUI } from './useCartUI';

export const useCart = () => {
  const cartItems = useCartData();

  const { checkedItems, setCheckedItems, isAllChecked, checkAll } = useCartSelection(cartItems);

  const { price, totalCount, shippingFee, totalPrice } = useCartCalculations({
    items: cartItems?.content,
    checkedIds: checkedItems,
  });

  const { descriptionMessage, isDisabled } = useCartUI({
    itemCount: cartItems?.content?.length ?? 0,
    checkedItemsCount: checkedItems.length,
  });

  return {
    cartItems,
    checkedItems,
    setCheckedItems,
    isAllChecked,
    checkAll,
    price,
    totalCount,
    shippingFee,
    totalPrice,
    descriptionMessage,
    isDisabled,
  };
};
