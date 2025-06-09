import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { useCartContext } from "../../stores/CartContext";
import { useSelectContext } from "../../stores/SelectContext";
import { useCouponSelectContext } from "../../stores/CouponContext";
import useCoupon from "../../hooks/useCoupon";
import { OrderService } from "../../services/orderService";
import OrderPriceSection from "../../components/OrderPriceSection/OrderPriceSection";
import * as S from "./CartPage.styled";

const OrderSection = () => {
  const navigate = useNavigate();
  const cartData = useCartContext();
  const selectData = useSelectContext();
  const selectedCouponStates = useCouponSelectContext();
  const { couponList } = useCoupon();

  const selectedCoupons = useMemo(() => {
    const selectedIds = selectedCouponStates
      .filter((state) => state.selected)
      .map((state) => state.id);
    return couponList.filter((coupon) => selectedIds.includes(coupon.id));
  }, [selectedCouponStates, couponList]);

  const { orderBreakdown, selectedCartItem } = useMemo(() => {
    const selectedCartData = cartData.filter(
      (_, idx) => selectData[idx]?.selected
    );

    const breakdown = OrderService.calculateOrderBreakdownWithCoupons(
      selectedCartData,
      false,
      selectedCoupons
    );

    return {
      orderBreakdown: breakdown,
      selectedCartItem: selectedCartData,
    };
  }, [selectData, cartData, selectedCoupons]);

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
