import { FooterButton, SelectBox } from '@/components/common';
import OrderCheckTitle from '@/components/features/orderCheck/orderCheckTitle/OrderCheckTitle';
import * as S from './OrderCheckContents.styles';
import OrderItem from '@/components/features/orderCheck/orderItem/OrderItem';
import { CartItemType } from '@/components/features/cart/types';
import BorderButton from '@/components/common/borderButton/BorderButton';
import { useState } from 'react';

interface OrderCheckContentsProps {
  orderItems: CartItemType[];
}

function OrderCheckContents({ orderItems }: OrderCheckContentsProps) {
  const [isRemoteArea, setIsRemoteArea] = useState(false);

  const toggleRemoteArea = () => {
    setIsRemoteArea((prev) => !prev);
  };
  return (
    <S.Container>
      <OrderCheckTitle />
      <S.OrderItemList>
        {orderItems.map((item) => (
          <OrderItem key={item.id} cartItem={item} />
        ))}
      </S.OrderItemList>
      <BorderButton onClick={() => console.log('쿠폰 적용 클릭')}>
        쿠폰 적용
      </BorderButton>
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
      <FooterButton disabled onClick={() => {}}>
        결제하기
      </FooterButton>
    </S.Container>
  );
}

export default OrderCheckContents;
