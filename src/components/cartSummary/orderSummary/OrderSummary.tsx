import { useRecoilValue } from "recoil";
import { cartSummarySelectorState } from "../../../recoil/selector/selector";
import BaseSummary from "../baseSummary/BaseSummary";

export const OrderSummary: React.FC = () => {
  const { orderPrice, orderDeliveryPrice, orderTotalPrice } =
    useRecoilValue(cartSummarySelectorState);
  const couponDiscountPrice = -6000;

  return (
    <div style={{ width: "100%" }}>
      <BaseSummary
        showCouponDiscount={true}
        couponDiscountPrice={couponDiscountPrice}
        orderPrice={orderPrice}
        deliveryPrice={orderDeliveryPrice}
        totalPrice={orderTotalPrice}
      />
    </div>
  );
};
