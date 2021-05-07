import React from 'react';
import Styled from './OrderItem.styles';
import OrderItemImageURL from '../../../assets/images/brave.png';

type OrderItemProps = {
  title: string;
  quantity: number;
  imageUrl?: string;
};

const OrderItem = (props: OrderItemProps) => {
  const { title, imageUrl, quantity } = props;

  return (
    <Styled.OrderItem>
      <Styled.OrderItemImage src={imageUrl} alt="김말이" />

      <Styled.OrderItemInfo>
        <Styled.OrderItemTitle>{title}</Styled.OrderItemTitle>
        <Styled.OrderItemQuantity>수량 : {quantity}개</Styled.OrderItemQuantity>
      </Styled.OrderItemInfo>
    </Styled.OrderItem>
  );
};

OrderItem.defaultProps = {
  imageUrl: OrderItemImageURL,
};

export default OrderItem;
