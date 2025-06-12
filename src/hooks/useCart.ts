import { useCartItemsData } from './useCartItemsData';
import { useCartSelection } from './useCartSelection';
import { useCartCalculations } from './useCartCalculations';
import { getCartDescription } from '../utils/cartCalculations';

export const useCart = () => {
  const cartItems = useCartItemsData();
  const { checkedItems, setCheckedItems, isAllChecked, checkAll } = useCartSelection();
  const { checkedCartItems, price, totalCount, shippingFee, totalPrice } = useCartCalculations({
    checkedIds: checkedItems,
  });

  const descriptionMessage = getCartDescription(cartItems?.content?.length ?? 0);

  const isDisabled = checkedItems.length === 0;

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
    selectedProducts: checkedCartItems,
  };
};
