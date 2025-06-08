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

  const { orderBreakdown, selectedCartItem } = useMemo(() => {
    const selectedCartData = cartData.filter(
      (_, idx) => selectData[idx]?.selected
    );

    const breakdown = OrderService.calculateOrderBreakdownWithCoupons(
      selectedCartData,
      false,
      []
    );

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

  const priceInfo = {
    orderPrice: orderBreakdown.orderAmount,
    deliveryPrice: orderBreakdown.deliveryFee,
    couponDiscount: orderBreakdown.couponDiscount,
    totalPrice: orderBreakdown.totalPrice,
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
