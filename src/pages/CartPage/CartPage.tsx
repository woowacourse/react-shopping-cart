import AllSelector from "../../components/AllSelector/AlllSelector";
import CartItem from "../../components/CartItem/CartItem";
import Description from "../../components/Description/Description";
import EmptyFallback from "../../components/Fallback/Empty/EmptyFallback";
import { FooterButton } from "../../components/FooterButton/FooterButton.styles";
import { Header } from "../../components/Header/Header.styles";
import PriceInfo from "../../components/PriceInfo/PriceInfo";
import Title from "../../components/Title/Title";
import useCart from "../../hooks/useCart";
import * as S from "./CartPage.styles";
import InfoIcon from "/info.svg";

const FREE_SHIPPING_THRESHOLD = 100_000;
const DEFAULT_SHIPPING_FEE = 3_000;

const calculateShippingFee = (orderPrice: number) => {
  if (orderPrice === 0) return 0;
  return orderPrice >= FREE_SHIPPING_THRESHOLD ? 0 : DEFAULT_SHIPPING_FEE;
};

const CartPage = () => {
  const { cartItemsData, calculateOrderPrice } = useCart();

  const orderPrice = calculateOrderPrice();
  const shippingFee = calculateShippingFee(orderPrice);

  return (
    <>
      <Header>
        <S.Logo href="/">SHOP</S.Logo>
      </Header>
      <S.Main>
        <Title>장바구니</Title>
        {cartItemsData.length > 0 ? (
          <S.ContentContainer>
            <Description>
              현재 {cartItemsData.length}종류의 상품이 담겨있습니다.
            </Description>
            <S.CartContainer>
              <AllSelector />
              <S.CartItemsContainer>
                {cartItemsData.map((cartItem) => (
                  <CartItem key={cartItem.id} cartItem={cartItem} />
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
                <PriceInfo label="주문 금액" price={orderPrice} />
                <PriceInfo label="배송비" price={shippingFee} />
              </S.PriceInfoWrapper>
              <S.PriceInfoWrapper>
                <PriceInfo
                  label="총 결제 금액"
                  price={orderPrice + shippingFee}
                />
              </S.PriceInfoWrapper>
            </S.PriceSummary>
          </S.ContentContainer>
        ) : (
          <EmptyFallback />
        )}
      </S.Main>
      <FooterButton disabled={cartItemsData.length === 0}>
        주문 확인
      </FooterButton>
    </>
  );
};

export default CartPage;
