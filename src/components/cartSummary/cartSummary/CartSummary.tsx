import { useRecoilValue } from "recoil";
import { cartSummarySelectorState } from "../../../recoil/selector/selector";
import BaseSummary from "../baseSummary/BaseSummary";

export const CartSummary: React.FC = () => {
  const { orderPrice, cartDeliveryPrice, cartTotalPrice } =
    useRecoilValue(cartSummarySelectorState);

  return (
    <BaseSummary
      orderPrice={orderPrice}
      deliveryPrice={cartDeliveryPrice}
      totalPrice={cartTotalPrice}
    />
  );
};
