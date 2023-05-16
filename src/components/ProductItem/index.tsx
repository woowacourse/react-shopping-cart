import React from 'react';
import styled from 'styled-components';
import { Product } from '../../types/product';
import Counter from '../Counter';

type ProductItemProps = {
  product: Product;
};

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const { name, price, imageUrl } = product;

  return (
    <StyledProductItemWrapper data-cy="product-item">
      <StyledThumbnailWrapper>
        <StyledThumbnail src={imageUrl} alt={name} />
        <Counter product={product} />
      </StyledThumbnailWrapper>
      <StyledInfoWrapper>
        <div>
          <StyledProductTitle>{name}</StyledProductTitle>
          <StyledProductPrice>{price.toLocaleString('ko-KR')}원</StyledProductPrice>
        </div>
      </StyledInfoWrapper>
    </StyledProductItemWrapper>
  );
};

const StyledProductItemWrapper = styled.li`
  width: 200px;
`;

const StyledThumbnailWrapper = styled.div`
  width: 200px;
  height: 200px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  overflow: clip;
  position: relative;

  & > div {
    position: absolute;
    right: 5px;
    bottom: 10px;
  }
`;

const StyledThumbnail = styled.img`
  width: 200px;
  height: 200px;
  padding: 10px;
  transition: all 0.3s ease 0s;

  &:hover {
    transform: scale(1.15);
  }
`;

const StyledInfoWrapper = styled.div`
  margin-top: 18px;
  padding: 0 10px;

  display: flex;
  justify-content: space-between;
  line-height: 22px;
  color: #333333;
  letter-spacing: 0.5px;
`;

const StyledProductTitle = styled.div`
  width: 180px;
  height: 44px;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StyledProductPrice = styled.div`
  width: 180px;
  height: 27px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  font-size: 20px;
  line-height: 27px;
`;

export default ProductItem;
