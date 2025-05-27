import { FooterButton } from "../../components/FooterButton/FooterButton.styles";
import { Header } from "../../components/Header/Header.styles";
import * as S from "./CartPage.styles";

const CartPage = () => {
  return (
    <>
      <Header>
        <S.Logo href="/">SHOP</S.Logo>
      </Header>
      <FooterButton>주문 확인</FooterButton>
    </>
  );
};

export default CartPage;
