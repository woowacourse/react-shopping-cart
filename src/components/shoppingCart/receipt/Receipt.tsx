import Vector from "../../../assets/Vector.svg";
import Hr from "../../common/Hr/Hr";

import Price from "../Price/Price";
import SubPrice from "../SubPrice/SubPrice";

import * as Styled from "./Receipt.styles";

interface ReceiptProps {
  allProductPrice: number;
  shippingFee: number;
  couponPrice?: number | null;
  totalPrice: number;
}

export default function Receipt({
  allProductPrice,
  shippingFee,
  couponPrice,
  totalPrice,
}: ReceiptProps) {
  return (
    <section>
      <Styled.Container>
        <Styled.WarningIcon src={Vector} />
        <p>총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.</p>
      </Styled.Container>
      <Hr />
      <SubPrice
        allProductPrice={allProductPrice}
        shippingFee={shippingFee}
        couponPrice={couponPrice}
      />
      <Hr />
      <Price name="총 결제 금액" price={totalPrice} />
    </section>
  );
}
