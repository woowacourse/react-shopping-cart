import { useLocation, useNavigate } from 'react-router-dom';
import { CartItemType } from '@/apis/cartItems/cartItem.type';

interface OrderSuccessState {
  orderItems: CartItemType[];
  orderTotalPrice: number;
}

type RouteState = OrderSuccessState | undefined;

export const usePageNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigateTo = <T extends RouteState>(route: string, state?: T) => {
    navigate(route, state ? { state } : undefined);
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
    navigateTo,
    validateOrderSuccessState,
  };
};
