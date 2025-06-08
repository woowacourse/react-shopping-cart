import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { useCartContext } from "../../stores/CartContext";
import { useSelectContext } from "../../stores/SelectContext";
import { calculateTotalPrice, calculateShippingFee } from "../../utils/price";
import { calculatePriceInfo } from "../../utils/priceBreakdown";
import OrderPriceSection from "../../components/OrderPriceSection/OrderPriceSection";
import * as S from "./CartPage.styled";

const OrderSection = () => {
  const navigate = useNavigate();
  const cartData = useCartContext();
  const selectData = useSelectContext();

  const { priceInfo, selectedCartItem } = useMemo(() => {
    const selectedCartData = cartData.filter(
      (_, idx) => selectData[idx]?.selected
    );
    const orderPrice = calculateTotalPrice(selectedCartData);
    const deliveryPrice = calculateShippingFee(orderPrice);
    const couponDiscount = 0;

    const calculatedPriceInfo = calculatePriceInfo(
      orderPrice,
      deliveryPrice,
      couponDiscount
    );

    return {
      priceInfo: calculatedPriceInfo,
      selectedCartItem: selectedCartData,
    };
  }, [selectData, cartData]);

  const handleOrderCheck = (): void => {
    navigate("/order-complete", {
      state: {
        selectedCartItem,
        totalPrice: priceInfo.totalPrice,
        orderPrice: priceInfo.orderPrice,
        deliveryPrice: priceInfo.deliveryPrice,
      },
    });
  };

  const isDeliveryFree = priceInfo.deliveryPrice === 0;

  return (
    <>
      <OrderPriceSection
        priceInfo={priceInfo}
        isDeliveryFree={isDeliveryFree}
      />
      <S.OrderButton
        onClick={handleOrderCheck}
        disabled={priceInfo.orderPrice === 0}
      >
        주문 확인
      </S.OrderButton>
    </>
  );
};

export default OrderSection;
