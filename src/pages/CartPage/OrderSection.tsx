import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { useCartContext } from "../../stores/CartContext";
import { useSelectContext } from "../../stores/SelectContext";
import { OrderService } from "../../services/orderService";
import OrderPriceSection from "../../components/OrderPriceSection/OrderPriceSection";
import * as S from "./CartPage.styled";

const OrderSection = () => {
  const navigate = useNavigate();
  const cartData = useCartContext();
  const selectData = useSelectContext();

  const { orderBreakdown, selectedCartItems } = useMemo(() => {
    const selectedCartData = cartData.filter(
      (_, idx) => selectData[idx]?.selected
    );

    const breakdown = OrderService.calculateBasicOrderBreakdown(
      selectedCartData,
      false
    );

    return {
      orderBreakdown: breakdown,
      selectedCartItems: selectedCartData,
    };
  }, [selectData, cartData]);

  const handleOrderCheck = (): void => {
    navigate("/order-complete", {
      state: {
        selectedCartItems,
        totalPrice: orderBreakdown.totalPrice,
        orderPrice: orderBreakdown.orderAmount,
        deliveryPrice: orderBreakdown.deliveryFee,
      },
    });
  };

  const priceInfo = {
    orderPrice: orderBreakdown.orderAmount,
    deliveryPrice: orderBreakdown.deliveryFee,
    totalPrice: orderBreakdown.totalPrice,
    couponDiscount: 0,
  };

  return (
    <>
      <OrderPriceSection priceInfo={priceInfo} />
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
