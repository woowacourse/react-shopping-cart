import React from 'react';
import Styled from './PurchasedItem.styles';
import defaultImageURL from '../../../assets/images/no_image.jpg';
import Button from '../../shared/Button/Button';
import * as T from '../../../types';

type PurchasedItemProps = {
  item: T.OrderItem;
  onClick: (productId: T.Product['productId']) => void;
};

const PurchasedItem = (props: PurchasedItemProps) => {
  const { item, onClick } = props;
  const { quantity, name, price, productId, imageUrl } = item;

  const totalPrice = price * quantity;

  const handleClick = () => {
    onClick(productId);
  };

  return (
    <Styled.Root>
      <Styled.Image src={imageUrl ?? defaultImageURL} alt={name} />
      <Styled.Info>
        <Styled.Title>{name}</Styled.Title>
        <Styled.Detail>
          {totalPrice.toLocaleString('ko-KR')}원 / 수량 : {quantity}개
        </Styled.Detail>
      </Styled.Info>
      <Styled.ButtonWrapper>
        <Button size={T.ButtonSize.SMALL} text="장바구니" onClick={handleClick} />
      </Styled.ButtonWrapper>
    </Styled.Root>
  );
};

export default PurchasedItem;
