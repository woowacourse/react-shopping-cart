import Description from "../../components/Description/Description";
import { FooterButton } from "../../components/FooterButton/FooterButton.styles";
import { Header } from "../../components/Header/Header.styles";
import Title from "../../components/Title/Title";
import TotalSelector from "../../components/TotalSelector/TotalSelector";
import * as S from "./CartPage.styles";

const CartPage = () => {
  return (
    <>
      <Header>
        <S.Logo href="/">SHOP</S.Logo>
      </Header>
      <S.Main>
        <S.TitleContainer>
          <Title>장바구니</Title>
          <Description>현재 2종류의 상품이 담겨있습니다.</Description>
        </S.TitleContainer>
        <TotalSelector checked={true} />
      </S.Main>
      <FooterButton>주문 확인</FooterButton>
    </>
  );
};

export default CartPage;
