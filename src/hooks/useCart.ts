import { useCartData } from './useCartData';
import { useCartSelection } from './useCartSelection';
import { useCartCalculations } from './useCartCalculations';
import { getCartDescription } from '../utils/cartCalculations';

export const useCart = () => {
  const cartItems = useCartData();

  const { checkedItems, setCheckedItems, isAllChecked, checkAll } = useCartSelection(cartItems);

  const { price, totalCount, shippingFee, totalPrice } = useCartCalculations({
    items: cartItems?.content,
    checkedIds: checkedItems,
  });

  const descriptionMessage = getCartDescription(cartItems?.content?.length ?? 0);

  const isDisabled = checkedItems.length === 0;

  const selectedProducts =
    cartItems?.content?.filter((item) => checkedItems.includes(item.id)) || [];

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
    selectedProducts,
  };
};
