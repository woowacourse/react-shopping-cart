import React from 'react';
import defaultImageURL from 'assets/images/brave.png';
import * as T from 'types';
import Button from 'components/shared/Button/Button';
import Styled from './PurchasedItem.styles';

type PurchasedItemProps = {
  item: T.OrderItem;
  onClick: (orderItem: T.OrderItem) => void;
};

const PurchasedItem = (props: PurchasedItemProps) => {
  const { item, onClick } = props;
  const { name, price, imageUrl, quantity } = item;

  const totalPrice = price * quantity;

  const handleClick = () => {
    onClick(item);
  };

  return (
    <Styled.Root>
      <Styled.Image src={imageUrl ?? defaultImageURL} alt="김말이" />
      <Styled.Info>
        <Styled.Title>{name}</Styled.Title>
        <Styled.Detail>
          {totalPrice.toLocaleString('ko-KR')}원 / 수량 : {quantity}개
        </Styled.Detail>
      </Styled.Info>
      <Styled.ButtonWrapper>
        <Button size={T.ButtonSize.REGULAR} text="장바구니" onClick={handleClick} />
      </Styled.ButtonWrapper>
    </Styled.Root>
  );
};

export default PurchasedItem;
