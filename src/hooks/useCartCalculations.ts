import { CartProduct } from '../types/cart';
import {
  filterCheckedItems,
  calculateTotalPrice,
  calculateTotalQuantity,
  calculateShippingFee,
} from '../utils/cartCalculations';

interface UseCartCalculationsProps {
  items: CartProduct[] | undefined;
  checkedIds: number[];
}

export const useCartCalculations = ({ items, checkedIds }: UseCartCalculationsProps) => {
  const checkedCartItems = items ? filterCheckedItems(items, checkedIds) : [];
  const price = calculateTotalPrice(checkedCartItems);
  const totalCount = calculateTotalQuantity(checkedCartItems);
  const hasItems = checkedIds.length > 0;
  const shippingFee = calculateShippingFee(price, hasItems);
  const totalPrice = price + shippingFee;

  return {
    checkedCartItems,
    price,
    totalCount,
    shippingFee,
    totalPrice,
  };
};