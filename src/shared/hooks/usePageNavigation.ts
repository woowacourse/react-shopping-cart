import { useLocation, useNavigate } from 'react-router-dom';
import { CartItemType } from '@entities/cart/type/cartItem.type';
import { ROUTES } from '@shared/config/routes';

interface OrderSuccessState {
  orderItems: CartItemType[];
  orderTotalPrice: number;
}

export const usePageNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigateToOrderSuccess = (state: OrderSuccessState) => {
    navigate(ROUTES.ORDER_SUCCESS, { state });
  };

  const navigateToCart = () => {
    navigate(ROUTES.CART);
  };

  const validateOrderSuccessState = (): OrderSuccessState | null => {
    if (!location.state) return null;

    const state = location.state as OrderSuccessState;
    if (
      !state.orderItems ||
      !Array.isArray(state.orderItems) ||
      typeof state.orderTotalPrice !== 'number'
    ) {
      return null;
    }

    return state;
  };

  return {
    navigateToOrderSuccess,
    navigateToCart,
    validateOrderSuccessState,
  };
};
