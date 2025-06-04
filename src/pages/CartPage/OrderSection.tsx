import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { useCartContext } from "../../stores/CartContext";
import { useSelectContext } from "../../stores/SelectContext";
import { calculateTotalPrice, calculateShippingFee } from "../../utils/price";
import OrderPriceSection from "../../components/OrderPriceSection/OrderPriceSection";
import * as S from "./CartPage.styled";

const OrderSection = () => {
  const navigate = useNavigate();
  const cartData = useCartContext();
  const selectData = useSelectContext();

  const { orderPrice, deliveryPrice, selectedCartItem } = useMemo(() => {
    const selectedCartData = cartData.filter(
      (_, idx) => selectData[idx]?.selected
    );
    const calculatedOrderPrice = calculateTotalPrice(selectedCartData);
    const calculatedDeliveryPrice = calculateShippingFee(calculatedOrderPrice);

    return {
      orderPrice: calculatedOrderPrice,
      deliveryPrice: calculatedDeliveryPrice,
      selectedCartItem: selectedCartData,
    };
  }, [selectData, cartData]);

  const handleOrderCheck = (): void => {
    navigate("/order-complete", {
      state: {
        selectedCartItem,
        totalPrice: orderPrice + deliveryPrice,
        orderPrice,
        deliveryPrice,
      },
    });
  };

  return (
    <>
      <OrderPriceSection
        orderPrice={orderPrice}
        deliveryPrice={deliveryPrice}
      />
      <S.OrderButton onClick={handleOrderCheck} disabled={orderPrice === 0}>
        주문 확인
      </S.OrderButton>
    </>
  );
};

export default OrderSection;
