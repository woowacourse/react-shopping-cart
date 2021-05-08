import React from 'react';
import ProductImage, { TYPE } from '../productImage/ProductImage';
import shoppingCartImg from '../../assets/shoppingCart.svg';
import styled from 'styled-components';

const Content = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 12px 0 12px;
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

const ProductListItem = ({ src, name, price, alt }) => (
  <div>
    <ProductImage type={TYPE.MEDIUM} src={src} alt={alt} />
    <Content>
      <li>
        <Name>{name}</Name>
        <Price>{price.toLocaleString('ko-KR')} 원</Price>
      </li>
      <li>
        <img src={shoppingCartImg} alt="장바구니" />
      </li>
    </Content>
  </div>
);

export default ProductListItem;
