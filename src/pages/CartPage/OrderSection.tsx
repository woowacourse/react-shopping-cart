// pages/CartPage/OrderSection.tsx
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { useCartContext } from "../../stores/CartContext";
import { useSelectContext } from "../../stores/SelectContext";
import {
  calculateOrderBreakdown,
  PriceInfo,
} from "../../utils/orderCalculator";
import OrderPriceSection from "../../components/OrderPriceSection/OrderPriceSection";
import * as S from "./CartPage.styled";

const OrderSection = () => {
  const navigate = useNavigate();
  const cartData = useCartContext();
  const selectData = useSelectContext();

  const { orderBreakdown, selectedCartItem } = useMemo(() => {
    const selectedCartData = cartData.filter(
      (_, idx) => selectData[idx]?.selected
    );

    const breakdown = calculateOrderBreakdown(selectedCartData, false, 0);

    return {
      orderBreakdown: breakdown,
      selectedCartItem: selectedCartData,
    };
  }, [selectData, cartData]);

  const handleOrderCheck = (): void => {
    navigate("/order-complete", {
      state: {
        selectedCartItem,
        totalPrice: orderBreakdown.totalPrice,
        orderPrice: orderBreakdown.orderAmount,
        deliveryPrice: orderBreakdown.deliveryFee,
      },
    });
  };

  const priceInfo: PriceInfo = {
    orderPrice: orderBreakdown.orderAmount,
    deliveryPrice: orderBreakdown.deliveryFee,
    couponDiscount: orderBreakdown.couponDiscount,
    totalPrice: orderBreakdown.totalPrice,
  };

  const isDeliveryFree = orderBreakdown.deliveryFee === 0;

  return (
    <>
      <OrderPriceSection
        priceInfo={priceInfo}
        isDeliveryFree={isDeliveryFree}
      />
      <S.OrderButton
        onClick={handleOrderCheck}
        disabled={orderBreakdown.orderAmount === 0}
      >
        주문 확인
      </S.OrderButton>
    </>
  );
};

export default OrderSection;
