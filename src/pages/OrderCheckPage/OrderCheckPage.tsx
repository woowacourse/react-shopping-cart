import { useLocation } from "react-router";

import Header from "../../components/layout/Header/Header";
import BackButton from "../../components/layout/Header/BackButton";
import Footer from "../../components/layout/Footer/Footer";
import * as S from "./OrderCheckPage.styles";

export default function OrderCheckPage() {
  const location = useLocation();
  const { checkedProductsLength, cartItemCheckListTotalQuantity, totalPrice } =
    location.state;

  return (
    <>
      <Header>
        <BackButton />
      </Header>
      <S.Container>
        <S.Title>주문 확인</S.Title>
        <S.Description>
          <p>
            총 {checkedProductsLength}종류의 상품{" "}
            {cartItemCheckListTotalQuantity}개를 주문합니다.
          </p>
          <p>최종 결제 금액을 확인해 주세요.</p>
        </S.Description>
        <S.PriceInfo>총 결제 금액</S.PriceInfo>
        <S.TotalPrice>{Number(totalPrice).toLocaleString()}원</S.TotalPrice>
      </S.Container>
      <Footer text="결제하기" active="false" handleClick={() => {}} />
    </>
  );
}
