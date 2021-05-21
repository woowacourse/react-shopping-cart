import React from 'react';
import defaultImageURL from 'assets/images/brave.png';
import * as T from 'types';
import Styled from './PurchasedItem.styles';
import Button from '../../shared/Button/Button';

type PurchasedItemProps = {
  item: T.CartItem;
  onClick: (product: T.Product) => void;
};

const PurchasedItem = (props: PurchasedItemProps) => {
  const { item, onClick } = props;
  const { quantity, product } = item;
  const { name, price, image } = product;

  const totalPrice = price * quantity;

  const handleClick = () => {
    onClick(product);
  };

  return (
    <Styled.Root>
      <Styled.Image src={image ?? defaultImageURL} alt={name} />
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
