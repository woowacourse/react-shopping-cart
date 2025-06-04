import { FooterButton, SelectBox, Separator } from '@/components/common';
import BorderButton from '@/components/common/borderButton/BorderButton';
import { CartItemType } from '@/components/features/cart/types';
import { calculateOrderPrice } from '@/components/features/cart/utils/cartCalculations';
import OrderCheckTitle from '@/components/features/orderCheck/orderCheckTitle/OrderCheckTitle';
import OrderItem from '@/components/features/orderCheck/orderItem/OrderItem';
import OrderPriceSummary from '@/components/features/orderCheck/orderPriceSummary/OrderPriceSummary';
import { useState } from 'react';
import * as S from './OrderCheckContents.styles';
import { Modal } from '@jae-o/modal-component-module';
import { useNavigate } from 'react-router';

interface OrderCheckContentsProps {
  orderItems: CartItemType[];
}

function OrderCheckContents({ orderItems }: OrderCheckContentsProps) {
  const [isRemoteArea, setIsRemoteArea] = useState(false);
  const navigate = useNavigate();

  const orderPrice = calculateOrderPrice(orderItems);

  const toggleRemoteArea = () => {
    setIsRemoteArea((prev) => !prev);
  };

  const moveToPaymentCheck = () => {
    navigate('/payment-check', {
      state: {
        orderItemQuantity: orderItems.length,
        totalProductQuantity: orderItems.reduce(
          (acc, item) => acc + item.quantity,
          0
        ),
        orderPrice,
      },
    });
  };

  return (
    <Modal>
      <S.Container>
        <OrderCheckTitle />
        <S.OrderItemList>
          {orderItems.map((item) => (
            <OrderItem key={item.id} cartItem={item} />
          ))}
        </S.OrderItemList>
        <Modal.OpenTrigger asChild>
          <BorderButton>쿠폰 적용</BorderButton>
        </Modal.OpenTrigger>
        <S.ShippingOptionBox>
          <S.ShippingOptionTitle>배송 정보</S.ShippingOptionTitle>
          <S.ShippingOptionSelectRow>
            <SelectBox
              id="shippingOption"
              selected={isRemoteArea}
              onClick={toggleRemoteArea}
            />
            <S.ShippingOptionSelectText htmlFor="shippingOption">
              제주도 및 도서 산간 지역
            </S.ShippingOptionSelectText>
          </S.ShippingOptionSelectRow>
        </S.ShippingOptionBox>
        <OrderPriceSummary value={orderPrice} />
        <FooterButton onClick={moveToPaymentCheck}>결제하기</FooterButton>
        <Modal.Container title="쿠폰 적용" style={{ gap: '32px' }}>
          <S.CouponContainer>
            <S.NoticeBox>
              <img src="./assets/Notification.svg" alt="알림" />
              <S.NoticeText>
                쿠폰은 최대 2개까지 사용할 수 있습니다.
              </S.NoticeText>
            </S.NoticeBox>
            <S.CouponList>
              <S.CouponItem>
                <Separator />
                <S.CouponTitleRow>
                  <SelectBox selected={false} />
                  <S.CouponTitle>무료배송 쿠폰</S.CouponTitle>
                </S.CouponTitleRow>
                <S.CouponDescriptionBox>
                  <S.CouponDescription>
                    만료일: 2024년 11월 30일
                  </S.CouponDescription>
                  <S.CouponDescription>
                    최소 주문 금액: 100,000원
                  </S.CouponDescription>
                </S.CouponDescriptionBox>
              </S.CouponItem>
              <S.CouponItem>
                <Separator />
                <S.CouponTitleRow>
                  <SelectBox selected={false} />
                  <S.CouponTitle>2개 구매 시 1개 무료 쿠폰</S.CouponTitle>
                </S.CouponTitleRow>
                <S.CouponDescriptionBox>
                  <S.CouponDescription>
                    만료일: 2024년 5월 30일
                  </S.CouponDescription>
                </S.CouponDescriptionBox>
              </S.CouponItem>
              <S.CouponItem>
                <Separator />
                <S.CouponTitleRow>
                  <SelectBox selected={true} />
                  <S.CouponTitle>
                    5만원 이상 구매 시 무료 배송 쿠폰
                  </S.CouponTitle>
                </S.CouponTitleRow>
                <S.CouponDescriptionBox>
                  <S.CouponDescription>
                    만료일: 2024년 8월 31일
                  </S.CouponDescription>
                  <S.CouponDescription>
                    최소 주문 금액: 50,000원
                  </S.CouponDescription>
                </S.CouponDescriptionBox>
              </S.CouponItem>
            </S.CouponList>
          </S.CouponContainer>
          <Modal.CloseTrigger asChild>
            <Modal.WideButton>총 6,000원 할인 쿠폰 사용하기</Modal.WideButton>
          </Modal.CloseTrigger>
        </Modal.Container>
      </S.Container>
    </Modal>
  );
}

export default OrderCheckContents;
