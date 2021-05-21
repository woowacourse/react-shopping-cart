import React, { ReactElement } from 'react';
import Styled from './OrderItem.styles';
import OrderItemImageURL from '../../../assets/images/brave.png';

type IProps = {
  title: string;
  quantity: number;
  imageUrl?: string;
};

const OrderItem = (props: IProps): ReactElement => {
  const { title, imageUrl = OrderItemImageURL, quantity } = props;

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

export default OrderItem;
