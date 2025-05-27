import Price from "../Price/Price";

import * as S from "./DetailPrice.styles";

export default function DetailPrice() {
  return (
    <S.DetailPrice>
      <Price name="주문 금액" price={70000} />
      <Price name="배송비" price={3000} />
    </S.DetailPrice>
  );
}
