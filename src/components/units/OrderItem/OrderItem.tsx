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
    <Styled.Root>
      <Styled.Image src={imageUrl} alt={title} />
      <Styled.Info>
        <Styled.Title>{title}</Styled.Title>
        <Styled.Quantity>수량 : {quantity}개</Styled.Quantity>
      </Styled.Info>
    </Styled.Root>
  );
};

OrderItem.defaultProps = {
  imageUrl: OrderItemImageURL,
};

export default OrderItem;
