import { useLocation } from "react-router";

import Header from "../../components/layout/Header/Header";
import BackButton from "../../components/layout/Header/BackButton";
import Footer from "../../components/layout/Footer/Footer";
import * as S from "./OrderCheckPage.styles";

export default function OrderCheckPage() {
  const location = useLocation();

  if (!location.state) {
    return (
      <S.Container>
        <S.Title>잘못된 접근입니다.</S.Title>
        <S.Description>
          <p>
            장바구니에서 상품을 선택한 후에만 주문 확인 페이지를 볼 수 있습니다.
          </p>
        </S.Description>
      </S.Container>
    );
  }

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
