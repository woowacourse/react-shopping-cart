import { useNavigate } from "react-router-dom";
import Description from "../../components/@common/Description/Description";
import Header from "../../components/@common/Header/Header";
import Title from "../../components/@common/Title/Title";
import { FooterButton } from "../../components/FooterButton/FooterButton.styles";
import OrderItem from "../../components/OrderItem/OrderItem";
import PriceInfo from "../../components/PriceInfo/PriceInfo";
import { ROUTES } from "../../constants/routes";
import useCart from "../../hooks/contexts/useCart";
import * as S from "./OrderPage.styles";
import InfoIcon from "/info.svg";
import BackIcon from "/left-arrow.svg";

const OrderPage = () => {
  const {
    orderItems,
    orderItemCount,
    orderQuantity,
    orderPrice,
    shippingFee,
    totalPrice,
  } = useCart();

  const navigate = useNavigate();
  const navigateToCart = () => navigate(ROUTES.CART);
  const navigateToPayment = () => navigate(ROUTES.PAYMENT);

  return (
    <>
      <Header>
        <S.BackIcon
          role="button"
          src={BackIcon}
          alt="back-icon"
          onClick={navigateToCart}
          tabIndex={0}
        />
      </Header>
      <S.Main>
        <Title>주문 확인</Title>
        <S.ContentContainer>
          <S.DescriptionContainer>
            <Description>
              총 {orderItemCount}종류의 상품 {orderQuantity}개를 주문합니다.
            </Description>
            <Description>최종 결제 금액을 확인해 주세요.</Description>
          </S.DescriptionContainer>
          <S.OrderItemsContainer>
            {orderItems.map((item) => (
              <OrderItem
                key={item.id}
                quantity={item.quantity}
                product={item.product}
              />
            ))}
          </S.OrderItemsContainer>
          <S.InfoContainer>
            <img src={InfoIcon} alt="info" />
            <Description>
              총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.
            </Description>
          </S.InfoContainer>
          <S.PriceSummary>
            <S.PriceInfoWrapper>
              <PriceInfo label="주문 금액" price={orderPrice} />
              <PriceInfo label="쿠폰 할인 금액" price={0} isNegative={true} />
              <PriceInfo label="배송비" price={shippingFee} />
            </S.PriceInfoWrapper>
            <S.PriceInfoWrapper>
              <PriceInfo label="총 결제 금액" price={totalPrice} />
            </S.PriceInfoWrapper>
          </S.PriceSummary>
        </S.ContentContainer>
      </S.Main>
      <FooterButton onClick={navigateToPayment}>결제하기</FooterButton>
    </>
  );
};

export default OrderPage;
