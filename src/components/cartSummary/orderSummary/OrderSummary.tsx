import { useRecoilValue } from "recoil";
import { useTotalDiscount } from "../../../hooks/useTotalDiscount";
import { cartSummarySelectorState } from "../../../recoil/selector/selector";
import BaseSummary from "../baseSummary/BaseSummary";

export const OrderSummary: React.FC = () => {
  const { orderPrice, orderDeliveryPrice, orderTotalPrice } =
    useRecoilValue(cartSummarySelectorState);
  const totalDiscountPrice = useTotalDiscount();
  const orderTotalPriceFinal = orderTotalPrice - totalDiscountPrice;

  return (
    <div style={{ width: "100%" }}>
      <BaseSummary
        showCouponDiscount={true}
        couponDiscountPrice={totalDiscountPrice}
        orderPrice={orderPrice}
        deliveryPrice={orderDeliveryPrice}
        totalPrice={orderTotalPriceFinal}
      />
    </div>
  );
};
