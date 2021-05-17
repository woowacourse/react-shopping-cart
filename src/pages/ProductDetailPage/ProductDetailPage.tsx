import React from 'react';
import * as T from '../../types';
import { theme } from '../../App.styles';
import Styled from './ProductDetailPage.styles';
import defaultImageUrl from '../../assets/images/no_image.jpg';
import Button from '../../components/shared/Button/Button';

const ProductDetailPage = () => {
  return (
    <Styled.Root>
      <Styled.Product>
        <Styled.Image src={defaultImageUrl} alt="상품 이미지" />
        <Styled.Title>[든든] 배달이의 오토바이</Styled.Title>
        <Styled.Line />
        <Styled.Detail>
          <Styled.DetailLabel>금액</Styled.DetailLabel>
          <Styled.DetailValue>99,800원</Styled.DetailValue>
        </Styled.Detail>
        <Button size={T.ButtonSize.LARGE} bgColor={theme.bgColor.darkBrown} text="장바구니" />
      </Styled.Product>
    </Styled.Root>
  );
};

export default ProductDetailPage;
