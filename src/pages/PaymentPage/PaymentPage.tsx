import { FooterButton } from "../../components/FooterButton/FooterButton.styles";
import Header from "../../components/@common/Header/Header";
import * as S from "./Payment.styles";
import Title from "../../components/@common/Title/Title";
import Description from "../../components/@common/Description/Description";
import useCart from "../../hooks/useCart";
import { useNavigate } from "react-router-dom";
import useCartCalculations from "../../hooks/useCartCalculations";

const PaymentPage = () => {
  const { orderItemCount } = useCart();
  const { orderQuantity, totalPrice } = useCartCalculations();

  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate("/");
  };

  return (
    <>
      <Header></Header>
      <S.Main>
        <Title>결제 확인</Title>
        <S.DescriptionContainer>
          <Description>
            총 {orderItemCount}종류의 상품 {orderQuantity}개를 주문합니다.
          </Description>
          <Description>최종 결제 금액을 확인해 주세요.</Description>
        </S.DescriptionContainer>
        <S.PriceContainer>
          <S.Label>총 결제 금액</S.Label>
          <S.Price>{totalPrice.toLocaleString()}원</S.Price>
        </S.PriceContainer>
      </S.Main>
      <FooterButton disabled={true} onClick={navigateToHome}>
        장바구니로 돌아가기
      </FooterButton>
    </>
  );
};

export default PaymentPage;
