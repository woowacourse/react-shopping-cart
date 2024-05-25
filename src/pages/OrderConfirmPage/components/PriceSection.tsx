import { useRecoilValue } from "recoil";

import {
  discountAmountSelector,
  totalOrderPriceSelector,
  totalPaymentAmountSelector,
} from "@/recoil/orderInformation";

import PriceInfoBox from "@/components/PriceInfoBox/PriceInfoBox";

import Styled from "../OrderConfirmPage.styles";
import { shippingFeeSelector } from "@/recoil/shippingFee";

const PriceSection = () => {
  const orderPrice = useRecoilValue(totalOrderPriceSelector);
  const shippingFee = useRecoilValue(shippingFeeSelector);
  const totalDiscountAmount = useRecoilValue(discountAmountSelector);
  const totalPaymentAmount = useRecoilValue(totalPaymentAmountSelector);

  return (
    <Styled.PriceSection>
      <Styled.BorderLine />
      <PriceInfoBox priceLabel="주문 금액" price={orderPrice} />
      <PriceInfoBox priceLabel="쿠폰 할인 금액" price={totalDiscountAmount} />
      <PriceInfoBox priceLabel="배송비" price={shippingFee} />

      <Styled.BorderLine />
      <PriceInfoBox priceLabel="총 결제 금액" price={totalPaymentAmount} />
    </Styled.PriceSection>
  );
};

export default PriceSection;
