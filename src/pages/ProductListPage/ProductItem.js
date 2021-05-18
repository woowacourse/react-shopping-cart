import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import Flex from '../../components/utils/Flex';
import Image from '../../components/utils/Image';
import PriceText from '../../components/utils/PriceText';
import IconButton from '../../components/utils/IconButton';

import { addItemToCart, addItemToCartRequest } from '../../modules/cartSlice';

import cartImage from '../../asset/cart.png';
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
  const cartItems = useSelector((state) => state.cartSlice);

  const onAddCartButtonClick = (product) => {
    const targetItem = cartItems.find((item) => item.product_id === product.product_id);

    if (targetItem && targetItem.quantity >= 1) {
      dispatch(addItemToCart(product));
      return;
    }

    dispatch(addItemToCart(product));
    addItemToCartRequest(product.product_id);
  };

  return (
    <SingleProduct>
      <Link to={`/products/${product.product_id}`}>
        <Image
          width="282px"
          height="285px"
          src={product.image_url}
          alt={product.name}
          className="product-image"
          isBackgroundImageNeeded={true}
        />
      </Link>
      <Flex spaceBetween="space-between" alignItems="center" css={ProductBottomStyle}>
        <Flex flexDirection="column" css={ProductInfoStyle}>
          <ProductName>{product.name}</ProductName>
          <PriceText fontSize="20px" lineHeight="26.7px">
            {product.price}
          </PriceText>
        </Flex>

        <IconButton src={cartImage} alt="장바구니 아이콘" onClick={() => onAddCartButtonClick(product, cartItems)} />
      </Flex>
    </SingleProduct>
  );
};

ProductItem.propTypes = {
  product: PropTypes.shape({
    product_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    image_url: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    // quantity: PropTypes.number.isRequired,
    // checked: PropTypes.bool.isRequired,
  }),
};

export default ProductItem;
