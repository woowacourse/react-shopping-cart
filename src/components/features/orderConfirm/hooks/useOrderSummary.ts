import {
  calculateOrderPrice,
  calculateTotalProductQuantity,
} from '../../cart/utils/cartCalculations';
import { useLocation } from 'react-router';

export default function useOrderSummary() {
  const location = useLocation();
  const products = location.state.orderProducts;

  const quantity = products.length;
  const totalProductQuantity = calculateTotalProductQuantity(products);
  const price = calculateOrderPrice(products);

  return { quantity, totalProductQuantity, price };
}
