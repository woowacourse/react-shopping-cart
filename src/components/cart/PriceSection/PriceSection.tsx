import { useRecoilValue } from "recoil";

import PriceInfoBox from "../PriceInfoBox/PriceInfoBox.tsx";

import * as S from "./PriceSection.styles.ts";

import { totalItemsPriceSelector } from "@/recoil/orderInformation.ts";
import { SHIPPING_FEE } from "@/constants/cart.ts";
import { shippingFeeSelector } from "@/recoil/shippingFeeType.ts";
import { discountCouponPriceState } from "@/recoil/coupons.ts";

interface Props {
  isApplyCoupon: boolean;
}

const PriceSection = ({ isApplyCoupon }: Props) => {
  const orderPrice = useRecoilValue(totalItemsPriceSelector);
  const shippingFeeType = useRecoilValue(shippingFeeSelector);
  const totalPrice = orderPrice + SHIPPING_FEE[shippingFeeType];
  const discountAmount = useRecoilValue(discountCouponPriceState);

  return (
    <S.Wrapper>
      <S.BorderLine />

      <PriceInfoBox priceLabel="주문 금액" price={orderPrice} />
      {isApplyCoupon && (
        <PriceInfoBox priceLabel="쿠폰 할인 금액 금액" price={discountAmount} />
      )}
      <PriceInfoBox priceLabel="배송비" price={SHIPPING_FEE[shippingFeeType]} />

      <S.BorderLine />

      <PriceInfoBox priceLabel="총 결제 금액" price={totalPrice} />
    </S.Wrapper>
  );
};

export default PriceSection;
