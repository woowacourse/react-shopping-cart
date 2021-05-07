import React from 'react';
import Styled from './PurchasedItem.styles';
import defaultImageURL from '../../../assets/images/brave.png';
import Button from '../../shared/Button/Button';
import * as T from '../../../types';

type PurchasedItemProps = {
  title: string;
  price: number;
  quantity: number;
  imageUrl?: string;
};

const PurchasedItem = (props: PurchasedItemProps) => {
  const { title, quantity, price, imageUrl } = props;

  return (
    <Styled.Root>
      <Styled.Image src={imageUrl} alt="김말이" />
      <Styled.Info>
        <Styled.Title>{title}</Styled.Title>
        <Styled.Detail>
          {price.toLocaleString('ko-KR')}원 / 수량 : {quantity}개
        </Styled.Detail>
      </Styled.Info>
      <Styled.ButtonWrapper>
        <Button size={T.ButtonSize.REGULAR} text="장바구니" />
      </Styled.ButtonWrapper>
    </Styled.Root>
  );
};

PurchasedItem.defaultProps = {
  imageUrl: defaultImageURL,
};

export default PurchasedItem;
