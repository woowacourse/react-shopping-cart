import { useNavigate } from 'react-router-dom';
import { ROUTE } from '../constants/systemConstants';
import type { CartItemType } from '../types/response';

const useEasyNavigate = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate(ROUTE.HOME);
  };

  const goOrderComplete = (
    productTypeCount: number,
    totalPrice: number,
    totalProductCount: number,
    orderedItems: CartItemType[]
  ) => {
    navigate(ROUTE.ORDER_COMPLETE, {
      state: { productTypeCount, totalPrice, totalProductCount, orderedItems },
    });
  };

  const goPaymentConfirmation = (
    productTypeCount: number,
    totalProductCount: number,
    finalAmount: number
  ) => {
    navigate(ROUTE.PAYMENT_CONFIRMATION, {
      state: { productTypeCount, totalProductCount, finalAmount },
    });
  };

  const goCart = () => {
    navigate(ROUTE.HOME);
  };

  return { goHome, goOrderComplete, goPaymentConfirmation, goCart };
};

export default useEasyNavigate;
