import { useNavigate } from "react-router-dom";
import { ROUTE } from "../constants/systemConstants";
import type { CartItemType } from "../types/response";

const useEasyNavigate = () => {
  const navigate = useNavigate();

  const goPrevPage = () => {
    navigate(-1);
  };

  const goHome = () => {
    navigate(ROUTE.CART);
  };

  const goOrderComplete = (
    productTypeCount: number,
    totalProductCount: number,
    totalPrice: number
  ) => {
    navigate(ROUTE.ORDER_COMPLETE, {
      state: { productTypeCount, totalPrice, totalProductCount },
    });
  };

  const goOrderConfirmation = (
    orderItems: CartItemType[],
    orderPrice: number,
    deliveryFee: number
  ) => {
    navigate(ROUTE.ORDER_CONFIRMATION, {
      state: { orderItems, orderPrice, deliveryFee },
    });
  };

  return { goHome, goOrderComplete, goOrderConfirmation, goPrevPage };
};

export default useEasyNavigate;
