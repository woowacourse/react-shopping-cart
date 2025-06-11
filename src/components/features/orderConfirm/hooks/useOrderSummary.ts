import {
  calculateOrderPrice,
  calculateTotalPrice,
  calculateTotalProductQuantity,
} from '../../cart/utils/cartCalculations';
import { useLocation } from 'react-router';

export default function useOrderSummary() {
  const location = useLocation();
  const products = location.state.orderProducts;

  const uniqueProductCount = products.length;
  const productQuantity = calculateTotalProductQuantity(products);
  const price = calculateOrderPrice(products);
  const { deliveryFee } = calculateTotalPrice(price);

  return {
    products,
    uniqueProductCount,
    productQuantity,
    price,
    deliveryFee,
  };
}
