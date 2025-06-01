import Price from "../Price/Price";

import * as Styled from "./SubPrice.styles";

interface SubPriceProps {
  allProductPrice: number;
  shippingFee: number;
}

export default function SubPrice({
  allProductPrice,
  shippingFee,
}: SubPriceProps) {
  return (
    <Styled.Container>
      <Price name="주문 금액" price={allProductPrice} />
      <Price name="배송비" price={shippingFee} />
    </Styled.Container>
  );
}
