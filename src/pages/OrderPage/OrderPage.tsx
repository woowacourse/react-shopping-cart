import { FooterButton } from "../../components/FooterButton/FooterButton.styles";
import Header from "../../components/Header/Header";
import BackIcon from "/left-arrow.svg";
import * as S from "./OrderPage.styles";
import Title from "../../components/Title/Title";
import Description from "../../components/Description/Description";

const OrderPage = () => {
  return (
    <>
      <Header>
        <S.Back href="/">
          <S.BackIcon src={BackIcon} alt="back-icon" />
        </S.Back>
      </Header>
      <S.Main>
        <Title>주문 확인</Title>
        <S.DescriptionContainer>
          <Description>총 2종류의 상품 4개를 주문합니다.</Description>
          <Description>최종 결제 금액을 확인해 주세요.</Description>
        </S.DescriptionContainer>
        <S.PriceContainer>
          <S.Label>총 결제 금액</S.Label>
          <S.Price>120,000원</S.Price>
        </S.PriceContainer>
      </S.Main>
      <FooterButton disabled={true}>결제하기</FooterButton>
    </>
  );
};

export default OrderPage;
