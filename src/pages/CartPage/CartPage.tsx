import CartItem from "../../components/CartItem/CartItem";
import Description from "../../components/Description/Description";
import { FooterButton } from "../../components/FooterButton/FooterButton.styles";
import { Header } from "../../components/Header/Header.styles";
import Title from "../../components/Title/Title";
import TotalSelector from "../../components/TotalSelector/TotalSelector";
import * as S from "./CartPage.styles";
import InfoIcon from "/info.svg";

const data = {
  id: 1,
  quantity: 2, // 담긴 수량
  product: {
    id: 7,
    name: "유기농 우유 1L",
    price: 3900,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Milk_glass.jpg/250px-Milk_glass.jpg",
    category: "식료품",
    stock: 3, // 재고
  },
};

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
        <S.CartContainer>
          <TotalSelector checked={true} />
          <S.CartItemsContainer>
            <CartItem cartItem={data} />
            <CartItem cartItem={data} />
            <CartItem cartItem={data} />
            <CartItem cartItem={data} />
            <CartItem cartItem={data} />
            <CartItem cartItem={data} />
            <CartItem cartItem={data} />
          </S.CartItemsContainer>
        </S.CartContainer>
        <S.InfoContainer>
          <img src={InfoIcon} alt="info" />
          <Description>
            총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.
          </Description>
        </S.InfoContainer>
      </S.Main>
      <FooterButton>주문 확인</FooterButton>
    </>
  );
};

export default CartPage;
