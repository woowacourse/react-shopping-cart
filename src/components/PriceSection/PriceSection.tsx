import { useRecoilValue } from "recoil";
import {
  shippingFeeSelector,
  totalOrderPriceSelector,
} from "@/recoil/orderInformation";

import PriceInfoBox from "../PriceInfoBox/PriceInfoBox";

import Styled from "./PriceSection.styles";

const PriceSection = () => {
  const orderPrice = useRecoilValue(totalOrderPriceSelector);
  const shippingFee = useRecoilValue(shippingFeeSelector);
  const totalPrice = orderPrice + shippingFee;

  return (
    <Styled.PriceSection>
      <Styled.BorderLine />

      <PriceInfoBox priceLabel="주문 금액" price={orderPrice} />
      <PriceInfoBox priceLabel="배송비" price={shippingFee} />

      <Styled.BorderLine />

      <PriceInfoBox priceLabel="총 결제 금액" price={totalPrice} />
    </Styled.PriceSection>
  );
};

export default PriceSection;
