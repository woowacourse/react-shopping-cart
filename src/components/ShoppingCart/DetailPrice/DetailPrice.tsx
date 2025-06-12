import Price from "../Price/Price";

import * as S from "./DetailPrice.styles";
interface DetailPriceProps {
  allProductPrice: number;
  shippingFee: number;
  couponDiscount?: number;
}

export default function DetailPrice({
  allProductPrice,
  shippingFee,
  couponDiscount = 0,
}: DetailPriceProps) {
  return (
    <S.DetailPrice>
      <Price name="주문 금액" price={allProductPrice} />
      {couponDiscount > 0 && (
        <Price name="쿠폰 할인 금액" price={-couponDiscount} />
      )}
      <Price name="배송비" price={shippingFee} />
    </S.DetailPrice>
  );
}
