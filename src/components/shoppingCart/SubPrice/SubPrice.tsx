import Price from "../Price/Price";

import * as Styled from "./SubPrice.styles";

interface SubPriceProps {
  allProductPrice: number;
  shippingFee: number;
  couponPrice?: number | null;
}

export default function SubPrice({
  allProductPrice,
  shippingFee,
  couponPrice,
}: SubPriceProps) {
  return (
    <Styled.Container>
      <Price name="주문 금액" price={allProductPrice} />
      {couponPrice && <Price name="쿠폰 할인 금액" price={couponPrice} />}
      <Price name="배송비" price={shippingFee} />
    </Styled.Container>
  );
}
