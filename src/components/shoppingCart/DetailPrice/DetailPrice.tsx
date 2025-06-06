import Price from "../Price/Price";

import * as S from "./DetailPrice.styles";
interface DetailPriceProps {
  allProductPrice: number;
  shippingFee: number;
}

export default function DetailPrice({
  allProductPrice,
  shippingFee,
}: DetailPriceProps) {
  return (
    <S.DetailPrice>
      <Price name="주문 금액" price={allProductPrice} />
      <Price name="쿠폰 할인 금액" price={-6000} />
      <Price name="배송비" price={shippingFee} />
    </S.DetailPrice>
  );
}
