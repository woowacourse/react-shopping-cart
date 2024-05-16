import { useRecoilValue } from "recoil";

import PriceInfoBox from "../PriceInfoBox/PriceInfoBox";

import * as S from "./PriceSection.styles";

import {
  shippingFeeSelector,
  totalOrderPriceSelector,
} from "@/recoil/orderInformation";

const PriceSection = () => {
  const orderPrice = useRecoilValue(totalOrderPriceSelector);
  const shippingFee = useRecoilValue(shippingFeeSelector);
  const totalPrice = orderPrice + shippingFee;

  return (
    <S.PriceSection>
      <S.BorderLine />

      <PriceInfoBox priceLabel="주문 금액" price={orderPrice} />
      <PriceInfoBox priceLabel="배송비" price={shippingFee} />

      <S.BorderLine />

      <PriceInfoBox priceLabel="총 결제 금액" price={totalPrice} />
    </S.PriceSection>
  );
};

export default PriceSection;
