import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import Flex from './utils/Flex';
import Image from './utils/Image';
import PriceText from './utils/PriceText';
import IconButton from './utils/IconButton';

import { addItemToCart } from '../modules/cart';

import cartImage from '../asset/cart.png';
import styled, { css } from 'styled-components';

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

const ProductName = styled.span`
  width: 100%;
  font-size: 16px;
  line-height: 22px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ProductBottomStyle = css`
  max-width: 282px;
  padding: 18px 12px 0;
`;

const ProductInfoStyle = css`
  width: 215px;
`;

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();

  const onAddCartButtonClick = (item) => {
    dispatch(addItemToCart(item));
  };

  return (
    <SingleProduct>
      <Image src={product.image} alt={product.name} className="product-image" isBackgroundImageNeeded={true} />

      <Flex spaceBetween="space-between" alignItems="center" css={ProductBottomStyle}>
        <Flex flexDirection="column" css={ProductInfoStyle}>
          <ProductName>{product.name}</ProductName>
          <PriceText fontSize="20px" lineHeight="26.7px">
            {product.price}
          </PriceText>
        </Flex>

        <IconButton src={cartImage} alt="장바구니 아이콘" onClick={() => onAddCartButtonClick(product)} />
      </Flex>
    </SingleProduct>
  );
};

ProductItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    checked: PropTypes.bool.isRequired,
  }),
};

export default ProductItem;
