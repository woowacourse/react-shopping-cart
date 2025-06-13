import { useNavigate } from "react-router-dom";
import Checkbox from "../../components/@common/Checkbox/Checkbox";
import Description from "../../components/@common/Description/Description";
import { FooterButton } from "../../components/@common/FooterButton/FooterButton.styles";
import Header from "../../components/@common/Header/Header";
import Title from "../../components/@common/Title/Title";
import PriceInfo from "../../components/@shared/PriceInfo/PriceInfo";
import CouponModal from "../../components/coupon/CouponModal/CouponModal";
import OrderItem from "../../components/order/OrderItem/OrderItem";
import { ROUTES } from "../../constants/routes";
import CouponInitializer from "../../domains/coupon/contexts/CouponInitializer";
import { FREE_SHIPPING_THRESHOLD } from "../../domains/order/constants";
import { useOrder } from "../../domains/order/hooks/useOrder";
import useOrderSummary from "../../domains/order/hooks/useOrderSummary";
import useModal from "../../features/modal/useModal";
import { formatCurrency } from "../../utils/formatters";
import * as S from "./OrderPage.styles";
import InfoIcon from "/info.svg";
import BackIcon from "/left-arrow.svg";
import { useCoupon } from "../../domains/coupon/hooks/useCoupon";
import { useEffect } from "react";

const OrderPage = () => {
  const { isRemoteArea, toggleRemoteArea } = useOrder();
  const { resetSelectedCoupons } = useCoupon();
  const {
    orderItems,
    orderItemCount,
    orderQuantity,
    orderPrice,
    totalDiscount,
    finalShippingFee,
    finalTotalPrice,
  } = useOrderSummary();

  const { openModal } = useModal();
  const openCouponModal = () => openModal(<CouponModal />);

  const navigate = useNavigate();
  const navigateToCart = () => navigate(ROUTES.CART);
  const navigateToPayment = () => navigate(ROUTES.PAYMENT);

  useEffect(() => {
    resetSelectedCoupons();
  }, [resetSelectedCoupons]);

  return (
    <>
      <CouponInitializer />
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
          <S.CouponButton onClick={openCouponModal}>쿠폰 적용</S.CouponButton>
          <S.ShippingInfoContainer>
            <S.ShippingLabel>배송 정보</S.ShippingLabel>
            <S.ShippingSurchargeContainer>
              <Checkbox selected={isRemoteArea} onClick={toggleRemoteArea} />
              <Description>제주도 및 도서 산간 지역</Description>
            </S.ShippingSurchargeContainer>
          </S.ShippingInfoContainer>
          <S.InfoContainer>
            <img src={InfoIcon} alt="info" />
            <Description>
              총 주문 금액이 {formatCurrency(FREE_SHIPPING_THRESHOLD)} 이상일
              경우 무료 배송됩니다.
            </Description>
          </S.InfoContainer>
          <S.PriceSummary>
            <S.PriceInfoWrapper>
              <PriceInfo label="주문 금액" price={orderPrice} />
              <PriceInfo
                label="쿠폰 할인 금액"
                price={totalDiscount}
                isNegative={true}
              />
              <PriceInfo label="배송비" price={finalShippingFee} />
            </S.PriceInfoWrapper>
            <S.PriceInfoWrapper>
              <PriceInfo label="총 결제 금액" price={finalTotalPrice} />
            </S.PriceInfoWrapper>
          </S.PriceSummary>
        </S.ContentContainer>
      </S.Main>
      <FooterButton onClick={navigateToPayment}>결제하기</FooterButton>
    </>
  );
};

export default OrderPage;
