import CartItem from "../../components/CartItem/CartItem";
import Description from "../../components/Description/Description";
import { FooterButton } from "../../components/FooterButton/FooterButton.styles";
import { Header } from "../../components/Header/Header.styles";
import PriceInfo from "../../components/PriceInfo/PriceInfo";
import Title from "../../components/Title/Title";
import TotalSelector from "../../components/TotalSelector/TotalSelector";
import useCart from "../../hooks/useCart";
import * as S from "./CartPage.styles";
import InfoIcon from "/info.svg";

const CartPage = () => {
  const { data } = useCart();

  return (
    <>
      <Header>
        <S.Logo href="/">SHOP</S.Logo>
      </Header>
      <S.Main>
        <S.TitleContainer>
          <Title>장바구니</Title>
          <Description>
            현재 {data.length}종류의 상품이 담겨있습니다.
          </Description>
        </S.TitleContainer>
        <S.CartContainer>
          <TotalSelector checked={true} />
          <S.CartItemsContainer>
            {data.map((cartItem) => (
              <CartItem cartItem={cartItem} />
            ))}
          </S.CartItemsContainer>
        </S.CartContainer>
        <S.InfoContainer>
          <img src={InfoIcon} alt="info" />
          <Description>
            총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.
          </Description>
        </S.InfoContainer>
        <S.PriceSummary>
          <S.PriceInfoWrapper>
            <PriceInfo label="주문 금액" price={70000} />
            <PriceInfo label="배송비" price={3000} />
          </S.PriceInfoWrapper>
          <S.PriceInfoWrapper>
            <PriceInfo label="총 결제 금액" price={73000} />
          </S.PriceInfoWrapper>
        </S.PriceSummary>
      </S.Main>
      <FooterButton>주문 확인</FooterButton>
    </>
  );
};

export default CartPage;
