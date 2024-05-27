import { useRecoilValue } from "recoil";
import { cartSummarySelectorState } from "../../../recoil/selector/selector";
import BaseSummary from "../baseSummary/BaseSummary";
import { useTotalDiscount } from "../../../hooks/useTotalDiscount";

export const OrderSummary: React.FC = () => {
  const { orderPrice, orderDeliveryPrice, orderTotalPrice } =
    useRecoilValue(cartSummarySelectorState);

  const totalDiscountPrice = useTotalDiscount();
  const formattedTotalDiscountPrice = isNaN(totalDiscountPrice)
    ? "0"
    : totalDiscountPrice.toLocaleString();

  return (
    <div style={{ width: "100%" }}>
      <BaseSummary
        showCouponDiscount={true}
        couponDiscountPrice={Number(formattedTotalDiscountPrice)}
        orderPrice={orderPrice}
        deliveryPrice={orderDeliveryPrice}
        totalPrice={orderTotalPrice}
      />
    </div>
  );
};
