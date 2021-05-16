import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Flex from '../components/utils/Flex';
import Image from '../components/utils/Image';
import Button from '../components/utils/Button';
import PriceText from '../components/utils/PriceText';

import { addItemToCart } from '../modules/cart';
import { addItemToCartRequest } from '../api/products';

import styled, { css } from 'styled-components';
import { getSingleProductRequest } from '../api/products';

const ProductDetailWrapperStyle = css`
  width: 1320px;
`;

const ProductTitleWrapper = styled.div`
  border-bottom: 4px solid #aaaaaa;
  text-align: left;
`;

const ProductTitle = styled.h3`
  width: 640px;
  font-size: 32px;
  line-height: 36px;
  font-weight: 700;
  color: #333333;
  margin: 27px 8px 32px 37px;
`;

const priceWrapperStyle = css`
  width: 640px;
  margin: 34px 0;
`;

const Price = styled.span`
  font-size: 24px;
  letter-spacing: 0.5px;
  width: 50px;
`;

const PriceTextStyle = css`
  width: 137px;
`;

const ProductDetailPage = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState({});

  useEffect(() => {
    const setProductsByFetch = async () => {
      setProduct(await getSingleProductRequest(productId));
    };

    setProductsByFetch();
  }, [productId]);

  const onAddCartButtonClick = (item) => {
    addItemToCartRequest(item.product_id);
    dispatch(addItemToCart(item));
  };

  return (
    <Flex flexDirection="column" alignItems="center" justifyContent="center" css={ProductDetailWrapperStyle}>
      <Image width="570px" height="570px" src={product.image_url} alt={product.name} />
      <ProductTitleWrapper>
        <ProductTitle>{product.name}</ProductTitle>
      </ProductTitleWrapper>
      <Flex flexDirection="row" alignItems="center" justifyContent="space-between" css={priceWrapperStyle}>
        <Price>금액</Price>
        {product.price && (
          <PriceText width="137px" fontSize="32px" lineHeight="26.7px" hoverFontWeight={700} css={PriceTextStyle}>
            {product.price}
          </PriceText>
        )}
      </Flex>
      <Button
        width="638px"
        height="98px"
        backgroundColor="#73675C"
        fontSize="32px"
        color="#FFFFFF"
        hoverFontWeight="700"
        onClick={() => onAddCartButtonClick(product)}
      >
        장바구니
      </Button>
    </Flex>
  );
};

export default ProductDetailPage;
