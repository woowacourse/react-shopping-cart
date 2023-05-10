import React from 'react';
import { AddToCartButton } from './AddToCartButton';
import { Text as ProductPrice, StyledText } from './common/Text';
import { Image as ProductImage } from './common/Image';
import styled from 'styled-components';

interface ProductItemProps {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

export const ProductItem = ({
  id,
  name,
  price,
  imageUrl,
}: ProductItemProps) => {
  return (
    <ProductItemWrapper key={id}>
      <ProductImage
        $width={'282px'}
        $height={'282px'}
        source={imageUrl}
        alternative="상품 이미지"
      />
      <ProductTextWrapper>
        <div>
          <ProductTitle size={'16px'} weight={'600'}>
            {name}
          </ProductTitle>
          <ProductPrice size={'20px'} weight={'600'}>
            {`${price.toLocaleString('ko-KR')} 원`}
          </ProductPrice>
        </div>
        <AddToCartButton />
      </ProductTextWrapper>
    </ProductItemWrapper>
  );
};

const ProductItemWrapper = styled.div`
  margin-bottom: 20px;
`;

const ProductTextWrapper = styled.div`
  width: 282px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 10px 10px 10px;
`;

const ProductTitle = styled(StyledText)`
  margin: 0 0 10px 0;
`;
