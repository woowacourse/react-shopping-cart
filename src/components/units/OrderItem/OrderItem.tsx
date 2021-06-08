import React, { ReactElement } from 'react';
import useImageFallback from '../../../hooks/useImageFallback';
import Styled from './OrderItem.styles';

interface IProps {
  title: string;
  quantity: number;
  imageUrl?: string;
}

const OrderItem = (props: IProps): ReactElement => {
  const { title, imageUrl, quantity } = props;
  const { imageUrl: currentImageUrl, onImageLoadError } = useImageFallback(imageUrl);

  return (
    <Styled.Root>
      <Styled.Image src={currentImageUrl} alt={title} onError={onImageLoadError} />
      <Styled.Info>
        <Styled.Title>{title}</Styled.Title>
        <Styled.Quantity>수량 : {quantity}개</Styled.Quantity>
      </Styled.Info>
    </Styled.Root>
  );
};

export default OrderItem;
