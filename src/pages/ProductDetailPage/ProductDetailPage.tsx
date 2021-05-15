import React, { useEffect, useState } from 'react';
import { Action } from 'redux';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { useSnackbar } from 'notistack';
import { RootState } from 'modules';
import { addCartItemRequest } from 'modules/cartItems/actions';
import { CartState } from 'modules/cartItems/reducers';
import useAddCartItem from 'hooks/useAddCartItem';
import * as T from 'types';
import MESSAGE from 'constants/messages';
import Styled from './ProductDetailPage.styles';

type LocationState = {
  product: T.Product;
};

const ProductDetailPage = () => {
  const location = useLocation<LocationState>();
  const { product } = location.state;
  const { image, name, price } = product;

  const addCartItem = useAddCartItem();

  const handleClickCart = () => {
    addCartItem(product);
  };

  return (
    <Styled.Root>
      <Styled.ImageWrapper>
        <Styled.Image src={image} alt="상품 이미지" />
      </Styled.ImageWrapper>
      <Styled.Title>{name}</Styled.Title>
      <Styled.Divider />
      <Styled.PriceWrapper>
        <Styled.PriceTitle>금액</Styled.PriceTitle>
        <Styled.PriceValue>{price}원</Styled.PriceValue>
      </Styled.PriceWrapper>
      <Styled.CartButton onClick={handleClickCart}>장바구니</Styled.CartButton>
    </Styled.Root>
  );
};

export default ProductDetailPage;
