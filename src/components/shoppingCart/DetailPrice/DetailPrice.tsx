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
  console.log(allProductPrice, shippingFee);
  return (
    <S.DetailPrice>
      <Price name="주문 금액" price={allProductPrice} />
      <Price name="배송비" price={shippingFee} />
    </S.DetailPrice>
  );
}
