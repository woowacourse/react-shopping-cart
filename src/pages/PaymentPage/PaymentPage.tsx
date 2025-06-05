import { useNavigate } from "react-router-dom";
import Description from "../../components/@common/Description/Description";
import Header from "../../components/@common/Header/Header";
import Title from "../../components/@common/Title/Title";
import FooterButton from "../../components/FooterButton/FooterButton";
import { ROUTES } from "../../constants/routes";
import useCart from "../../hooks/contexts/useCart";
import * as S from "./PaymentPage.styles";

const PaymentPage = () => {
  const { orderItemCount, orderQuantity, totalPrice } = useCart();
  const navigate = useNavigate();
  const navigateToCart = () => navigate(ROUTES.CART);

  return (
    <>
      <Header />
      <S.Main>
        <Title>주문 확인</Title>
        <S.DescriptionContainer>
          <Description>
            총 {orderItemCount}종류의 상품 {orderQuantity}개를 주문했습니다.
          </Description>
          <Description>최종 결제 금액을 확인해 주세요.</Description>
        </S.DescriptionContainer>
        <S.PriceContainer>
          <S.Label>총 결제 금액</S.Label>
          <S.Price>{totalPrice.toLocaleString()}원</S.Price>
        </S.PriceContainer>
      </S.Main>
      <FooterButton onClick={navigateToCart}>장바구니로 돌아가기</FooterButton>
    </>
  );
};

export default PaymentPage;
