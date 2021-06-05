import useAddCart from 'hooks/useAddCart';
import React from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { Product } from 'types';
import Styled from './ProductDetailPage.styles';

type LocationState = {
  product: Product;
};

const ProductDetailPage = () => {
  const location = useLocation<LocationState>();
  const addCartItem = useAddCart();

  if (!location.state) return <Redirect to="/" />;

  const { product } = location.state;

  const handleClickCart = () => {
    addCartItem(product);
  };

  return (
    <Styled.Root>
      <Styled.ImageWrapper>
        <Styled.Image src={product.image} />
      </Styled.ImageWrapper>
      <Styled.Title>{product.name}</Styled.Title>
      <Styled.Divider />
      <Styled.PriceWrapper>
        <Styled.PriceWrapperTitle>금액</Styled.PriceWrapperTitle>
        <Styled.PriceWrapperPrice>{product.price}원</Styled.PriceWrapperPrice>
      </Styled.PriceWrapper>
      <Styled.Button onClick={handleClickCart}>장바구니</Styled.Button>
    </Styled.Root>
  );
};

export default ProductDetailPage;
