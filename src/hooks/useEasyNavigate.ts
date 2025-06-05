import { useNavigate } from "react-router-dom";
import { ROUTE } from "../constants/systemConstants";
import type { CartItemType } from "../types/response";

const useEasyNavigate = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate(ROUTE.CART);
  };

  const goOrderComplete = (
    productTypeCount: number,
    totalPrice: number,
    totalProductCount: number
  ) => {
    navigate(ROUTE.ORDER_COMPLETE, {
      state: { productTypeCount, totalPrice, totalProductCount },
    });
  };

  const goOrderConfirmation = (
    orderItems: CartItemType[],
    orderPrice: number,
    deliveryFee: number,
    totalPrice: number
  ) => {
    navigate(ROUTE.ORDER_CONFIRMATION, {
      state: { orderItems, orderPrice, deliveryFee, totalPrice },
    });
  };

  return { goHome, goOrderComplete, goOrderConfirmation };
};

export default useEasyNavigate;
