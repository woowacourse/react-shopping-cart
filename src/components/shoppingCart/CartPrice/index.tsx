import { useRecoilValue } from "recoil";
import { cartPriceState } from "@/stores/cartPrice";

import PriceInfo from "@/components/_common/PriceInfo";

const CartPrice = () => {
  const { orderPrice, shippingFee, totalPrice } =
    useRecoilValue(cartPriceState);

  return (
    <>
      <PriceInfo>
        <PriceInfo.Row title="주문 금액" price={orderPrice} />
        <PriceInfo.Row title="배송비" price={shippingFee} />
      </PriceInfo>
      <PriceInfo>
        <PriceInfo.Row title="총 결제 금액" price={totalPrice} />
      </PriceInfo>
    </>
  );
};

export default CartPrice;
