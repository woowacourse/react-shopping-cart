import { useLocation, useNavigate } from "react-router";

import Footer from "../../components/layout/Footer/Footer";

import * as Styled from "./OrderCheckPage.styles";

import { DEFAULT_URL } from "../../router";

export default function OrderCheckPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    checkedProductsLength = 0,
    cartItemCheckListTotalQuantity = 0,
    totalPrice = 0,
  } = location.state || {};

  if (!location.state) {
    return (
      <Styled.Container>
        <h1>잘못된 접근입니다.</h1>
        <p>주문 확인 페이지로 올바르게 접근해 주세요.</p>
      </Styled.Container>
    );
  }

  const handlePayment = () => {
    navigate(`${DEFAULT_URL}/order-success`, {
      state: {
        checkedProductsLength,
        cartItemCheckListTotalQuantity,
        totalPrice,
      },
    });
  };

  return (
    <>
      <Styled.Container>
        <h1>결제 확인</h1>
        <Styled.OrderSummary>
          <p>
            총 {checkedProductsLength}종류의 상품{" "}
            {cartItemCheckListTotalQuantity}개를 주문합니다.
          </p>
          <p>최종 결제 금액을 확인해 주세요.</p>
        </Styled.OrderSummary>
        <Styled.PriceInfo>총 결제 금액</Styled.PriceInfo>
        <Styled.TotalPrice>
          {Number(totalPrice).toLocaleString()}원
        </Styled.TotalPrice>
      </Styled.Container>
      <Footer text="결제하기" active={true} handleClick={handlePayment} />
    </>
  );
}
