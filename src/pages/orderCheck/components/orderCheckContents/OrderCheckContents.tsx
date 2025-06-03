import { FooterButton } from '@/components/common';
import OrderCheckTitle from '@/components/features/orderCheck/orderCheckTitle/OrderCheckTitle';
import * as S from './OrderCheckContents.styles';
import OrderItem from '@/components/features/orderCheck/orderItem/OrderItem';
import { CartItemType } from '@/components/features/cart/types';
import BorderButton from '@/components/common/borderButton/BorderButton';

interface OrderCheckContentsProps {
  orderItems: CartItemType[];
}

function OrderCheckContents({ orderItems }: OrderCheckContentsProps) {
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
      <FooterButton disabled onClick={() => {}}>
        결제하기
      </FooterButton>
    </S.Container>
  );
}

export default OrderCheckContents;
