import { FooterButton, SelectBox } from '@/components/common';
import BorderButton from '@/components/common/borderButton/BorderButton';
import { CartItemType } from '@/components/features/cart/types';
import { calculateOrderPrice } from '@/components/features/cart/utils/cartCalculations';
import OrderCheckTitle from '@/components/features/orderCheck/orderCheckTitle/OrderCheckTitle';
import OrderItem from '@/components/features/orderCheck/orderItem/OrderItem';
import OrderPriceSummary from '@/components/features/orderCheck/orderPriceSummary/OrderPriceSummary';
import { useState } from 'react';
import * as S from './OrderCheckContents.styles';
import { Modal } from '@jae-o/modal-component-module';

interface OrderCheckContentsProps {
  orderItems: CartItemType[];
}

function OrderCheckContents({ orderItems }: OrderCheckContentsProps) {
  const [isRemoteArea, setIsRemoteArea] = useState(false);

  const orderPrice = calculateOrderPrice(orderItems);

  const toggleRemoteArea = () => {
    setIsRemoteArea((prev) => !prev);
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
        <Modal.OpenTrigger>
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
        <FooterButton disabled onClick={() => {}}>
          결제하기
        </FooterButton>
        <Modal.Container title="쿠폰 적용"></Modal.Container>
      </S.Container>
    </Modal>
  );
}

export default OrderCheckContents;
