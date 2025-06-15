import Info from "../../../assets/Info.png";
import Hr from "../../common/Hr/Hr";

import Price from "../Price/Price";
import DetailPrice from "../DetailPrice/DetailPrice";

import * as S from "./Receipt.styles";

interface ReceiptProps {
  allProductPrice: number;
  shippingFee: number;
  couponDiscount?: number;
}

export default function Receipt({
  allProductPrice,
  shippingFee,
  couponDiscount = 0,
}: ReceiptProps) {
  return (
    <section>
      <S.DescriptionContent>
        <S.Img src={Info} />
        <S.Description>
          총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.
        </S.Description>
      </S.DescriptionContent>
      <Hr />
      <DetailPrice
        allProductPrice={allProductPrice}
        couponDiscount={couponDiscount}
        shippingFee={shippingFee}
      />
      <Hr />
      <Price
        name="총 결제 금액"
        price={allProductPrice + shippingFee - couponDiscount}
      />
    </section>
  );
}
