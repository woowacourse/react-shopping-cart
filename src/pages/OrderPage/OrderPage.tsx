import { useNavigate } from "react-router-dom";
import Description from "../../components/@common/Description/Description";
import Header from "../../components/@common/Header/Header";
import Title from "../../components/@common/Title/Title";
import { FooterButton } from "../../components/FooterButton/FooterButton.styles";
import { ROUTES } from "../../constants/routes";
import useCart from "../../hooks/contexts/useCart";
import * as S from "./OrderPage.styles";
import BackIcon from "/left-arrow.svg";

const OrderPage = () => {
  const { orderItemCount, orderQuantity, totalPrice } = useCart();

  const navigate = useNavigate();

  const navigateToBack = () => {
    navigate(ROUTES.HOME);
  };

  return (
    <>
      <Header>
        <S.BackIcon
          role="button"
          src={BackIcon}
          alt="back-icon"
          onClick={navigateToBack}
          tabIndex={0}
        />
      </Header>
      <S.Main>
        <Title>주문 확인</Title>
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
      <FooterButton disabled={true}>결제하기</FooterButton>
    </>
  );
};

export default OrderPage;
