import React from 'react';
import { useDispatch } from 'react-redux';

import Image from '../../components/utils/Image';
import PriceText from '../../components/utils/PriceText';
import IconButton from '../../components/utils/IconButton';

import { addItemToCart } from '../../modules/cart';

import cartImage from '../../asset/cart.png';
import styled from 'styled-components';

const SingleProduct = styled.li`
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  height: 360px;
  cursor: pointer;

  &:hover .product-image {
    transition: all 0.3s ease-out 0s;
    transform: scale(1.1);
  }
`;

const ProductDescDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 282px;
  padding: 18px 12px 0;
`;

const ProductInfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 215px;
`;

const ProductName = styled.span`
  width: 100%;
  font-size: 16px;
  line-height: 22px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();

  const onAddCartButtonClick = (item) => {
    dispatch(addItemToCart(item));
  };

  return (
    <SingleProduct>
      <Image src={product.image} alt={product.name} className="product-image" isBackgroundImageNeeded={true} />

      <ProductDescDiv>
        <ProductInfoDiv>
          <ProductName>{product.name}</ProductName>
          <PriceText fontSize="20px" lineHeight="26.7px">
            {product.price}
          </PriceText>
        </ProductInfoDiv>

        <IconButton src={cartImage} alt="장바구니 아이콘" onClick={() => onAddCartButtonClick(product)} />
      </ProductDescDiv>
    </SingleProduct>
  );
};

export default ProductItem;
