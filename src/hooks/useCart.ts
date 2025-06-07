import { useData } from '../context/DataContext';
import { getCartItems } from '../apis/cart';
import { CartItemsResponse } from '../types/cart';
import { useCartSelection } from './useCartSelection';
import {
  filterCheckedItems,
  calculateTotalPrice,
  calculateTotalQuantity,
  calculateShippingFee,
  getCartDescription,
} from '../utils/cartCalculations';

export const useCart = () => {
  const { data: cartItems } = useData<CartItemsResponse>({
    fetcher: getCartItems,
    name: 'cartItems',
  });

  const { checkedItems, setCheckedItems, isAllChecked, checkAll } = useCartSelection(cartItems);

  const checkedCartItems = cartItems?.content
    ? filterCheckedItems(cartItems.content, checkedItems)
    : [];

  const price = calculateTotalPrice(checkedCartItems);
  const totalCount = calculateTotalQuantity(checkedCartItems);
  const hasItems = checkedItems.length > 0;
  const shippingFee = calculateShippingFee(price, hasItems);
  const totalPrice = price + shippingFee;

  const descriptionMessage = () => {
    const itemCount = cartItems?.content?.length ?? 0;
    return getCartDescription(itemCount);
  };

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
  };
};
