import { useRecoilValue } from "recoil";
import { cartPriceState } from "@/stores/cartPrice";

import PriceInfo from "@/components/_common/PriceInfo";
import useDiscountCalculator from "@/hooks/coupons/useDiscountCalculator";

const OrderPrice = () => {
  const { orderPrice, shippingFee, totalPrice } =
    useRecoilValue(cartPriceState);
  const { totalDiscountPrice } = useDiscountCalculator();

  return (
    <>
      <PriceInfo>
        <PriceInfo.Row title="주문 금액" price={orderPrice} />
        <PriceInfo.Row
          title="쿠폰 할인 금액"
          price={totalDiscountPrice}
          isDiscount={true}
        />
        <PriceInfo.Row title="배송비" price={shippingFee} />
      </PriceInfo>
      <PriceInfo>
        <PriceInfo.Row
          title="총 결제 금액"
          price={totalPrice - totalDiscountPrice}
        />
      </PriceInfo>
    </>
  );
};

export default OrderPrice;
