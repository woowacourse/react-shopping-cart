import { useRecoilValue } from "recoil";
import { totalOrderPriceSelector } from "@/recoil/orderInformation";
import { shippingFeeSelector } from "@/recoil/shippingFee";

import PriceInfoBox from "@/components/PriceInfoBox/PriceInfoBox";
import Styled from "../CartPage.style";

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
