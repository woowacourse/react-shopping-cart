import React from 'react';
import ProductImage, { PRODUCT_IMAGE_TYPE } from '../productImage/ProductImage';
import shoppingCartImg from '../../assets/shoppingCart.svg';
import styled from 'styled-components';

const Content = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 12px 4px 12px;
`;

const Name = styled.div`
  letter-spacing: 0.5px;
  line-height: 22px;
`;

const Price = styled.div`
  font-size: 20px;
  margin-top: 3px;
  letter-spacing: 0.5px;
  line-height: 27px;
`;

const Image = styled.img`
  cursor: pointer;
`;

const ProductListItem = ({ src, name, price, alt }) => (
  <div>
    <ProductImage type={PRODUCT_IMAGE_TYPE.MEDIUM} src={src} alt={alt} />
    <Content>
      <li>
        <Name>{name}</Name>
        <Price>{price.toLocaleString('ko-KR')} 원</Price>
      </li>
      <li>
        <Image src={shoppingCartImg} alt="장바구니" />
      </li>
    </Content>
  </div>
);

export default ProductListItem;
