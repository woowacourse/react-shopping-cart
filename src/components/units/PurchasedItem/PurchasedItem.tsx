import React, { ReactElement } from 'react';
import Button from 'components/shared/Button/Button';
import * as T from 'types';
import { toPriceFormat } from 'utils';
import useImageFallback from 'hooks/useImageFallback';
import Styled from './PurchasedItem.styles';

interface Props {
  item: T.OrderItem;
  onClick: (productId: T.Product['productId']) => void;
}

const PurchasedItem = (props: Props): ReactElement => {
  const { item, onClick } = props;
  const { quantity, name, price, productId, imageUrl } = item;

  const totalPrice = price * quantity;

  const { imageUrl: currentImageUrl, onImageLoadError } = useImageFallback(imageUrl);

  const handleClick = () => {
    onClick(productId);
  };

  return (
    <Styled.Root>
      <Styled.Image src={currentImageUrl} alt={name} onError={onImageLoadError} />
      <Styled.Info>
        <Styled.Title>{name}</Styled.Title>
        <Styled.Detail>
          {toPriceFormat(totalPrice)}원 / 수량 : {quantity}개
        </Styled.Detail>
      </Styled.Info>
      <Styled.ButtonWrapper>
        <Button size={T.ButtonSize.SMALL} text="장바구니" onClick={handleClick} />
      </Styled.ButtonWrapper>
    </Styled.Root>
  );
};

export default PurchasedItem;
