import { useLocation, useNavigate } from 'react-router-dom';
import { CartItemType } from '@entities/cart';
import { ROUTES } from '@app/config/routes';

interface OrderSuccessState {
  orderItems: CartItemType[];
}

interface PaymentSuccessState {
  orderItems: CartItemType[];
  orderTotalPrice: number;
}

export const usePageNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigateToCart = () => {
    navigate(ROUTES.CART);
  };

  const navigateToOrder = (state: OrderSuccessState) => {
    navigate(ROUTES.ORDER, { state });
  };

  const navigateToPayment = (state: PaymentSuccessState) => {
    navigate(ROUTES.PAYMENT, { state });
  };

  const getOrderSuccessState = (): OrderSuccessState | null => {
    if (!location.state) return null;

    const state = location.state as OrderSuccessState;
    if (!state.orderItems || !Array.isArray(state.orderItems)) {
      return null;
    }

    return state;
  };

  const getPaymentSuccessState = (): PaymentSuccessState | null => {
    if (!location.state) return null;

    const state = location.state as PaymentSuccessState;
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
    navigateToCart,
    getOrderSuccessState,
    navigateToOrder,
    navigateToPayment,
    getPaymentSuccessState,
  };
};
