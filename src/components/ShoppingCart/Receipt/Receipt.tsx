import WarningBox from "../../common/WarningBox/WarningBox";
import Hr from "../../common/Hr/Hr";

import Price from "../Price/Price";
import SubPrice from "../SubPrice/SubPrice";

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
      <WarningBox text="총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다." />
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
