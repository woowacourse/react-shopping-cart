import Vector from "/Vector.png";
import Hr from "../../common/Hr/Hr";

import Price from "../Price/Price";
import DetailPrice from "../DetailPrice/DetailPrice";

import * as S from "./Receipt.styles";
import { CartItemCheck } from "../../../types/CartItemCheck";

interface ReceiptProps {
  cartItemCheckList: CartItemCheck[];
}

export default function Receipt({ cartItemCheckList }: ReceiptProps) {
  const selectedCartItemList = cartItemCheckList.filter(
    (item) => item.isClicked === true
  );
  const allProductPrice = selectedCartItemList.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingFee = allProductPrice >= 100000 ? 0 : 3000;

  return (
    <section>
      <S.DescriptionContent>
        <S.Img src={Vector} />
        <S.Description>
          총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.
        </S.Description>
      </S.DescriptionContent>
      <Hr />
      <DetailPrice
        allProductPrice={allProductPrice}
        shippingFee={shippingFee}
      />
      <Hr />
      <Price name="총 결제 금액" price={allProductPrice + shippingFee} />
    </section>
  );
}
