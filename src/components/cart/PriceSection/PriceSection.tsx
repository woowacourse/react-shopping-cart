import { useRecoilValue } from "recoil";

import PriceInfoBox from "../PriceInfoBox/PriceInfoBox.tsx";

import * as S from "./PriceSection.styles.ts";

import { totalOrderPriceSelector } from "@/recoil/orderInformation.ts";
import useCalculateShippingFee from "@/hooks/useCalculateShippingFee.ts";
import { SHIPPING_FEE } from "@/constants/cart.ts";

const PriceSection = ({ isApplyCoupon }: { isApplyCoupon: boolean }) => {
  const orderPrice = useRecoilValue(totalOrderPriceSelector);
  const { shippingFeeType } = useCalculateShippingFee();
  const totalPrice = orderPrice + SHIPPING_FEE[shippingFeeType];

  return (
    <S.Wrapper>
      <S.BorderLine />

      <PriceInfoBox priceLabel="주문 금액" price={orderPrice} />
      {isApplyCoupon && (
        <PriceInfoBox priceLabel="쿠폰 할인 금액 금액" price={0} />
      )}
      <PriceInfoBox priceLabel="배송비" price={SHIPPING_FEE[shippingFeeType]} />

      <S.BorderLine />

      <PriceInfoBox priceLabel="총 결제 금액" price={totalPrice} />
    </S.Wrapper>
  );
};

export default PriceSection;
