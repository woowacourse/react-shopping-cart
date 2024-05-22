import { useRecoilValue } from "recoil";

import PriceInfoBox from "../PriceInfoBox/PriceInfoBox.tsx";

import * as S from "./PriceSection.styles.ts";

import {
  shippingFeeState,
  totalOrderPriceSelector,
} from "@/recoil/orderInformation.ts";

const PriceSection = ({ isApplyCoupon }: { isApplyCoupon: boolean }) => {
  const orderPrice = useRecoilValue(totalOrderPriceSelector);
  const shippingFee = useRecoilValue(shippingFeeState);
  const totalPrice = orderPrice + shippingFee;

  return (
    <S.Wrapper>
      <S.BorderLine />

      <PriceInfoBox priceLabel="주문 금액" price={orderPrice} />
      {isApplyCoupon && (
        <PriceInfoBox priceLabel="쿠폰 할인 금액 금액" price={0} />
      )}
      <PriceInfoBox priceLabel="배송비" price={shippingFee} />

      <S.BorderLine />

      <PriceInfoBox priceLabel="총 결제 금액" price={totalPrice} />
    </S.Wrapper>
  );
};

export default PriceSection;
