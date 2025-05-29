import { FooterButton } from "../../components/FooterButton/FooterButton.styles";
import Header from "../../components/@common/Header/Header";
import BackIcon from "/left-arrow.svg";
import * as S from "./OrderPage.styles";
import Title from "../../components/@common/Title/Title";
import Description from "../../components/@common/Description/Description";
import useCart from "../../hooks/useCart";
import { useNavigate } from "react-router-dom";

const OrderPage = () => {
  const { orderItemCount, orderQuantity, totalPrice } = useCart();

  const navigate = useNavigate();

  const navigateToBack = () => {
    navigate(-1);
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
