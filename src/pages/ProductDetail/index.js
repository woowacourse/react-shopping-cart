import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { Button, Card, NumericInput } from '../../components/shared';
import Thumbnail from '../../components/shared/Thumbnail';
import { COLOR, FETCH_URL, MESSAGE } from '../../constants';
import API from '../../request/api';
import useFetch from '../../request/useFetch';
import { addItemToCart } from '../../store/cartReducer';
import { Component, ProductSummary, Price, ButtonSet, Quantity } from './style';

const ProductDetail = () => {
  const { id } = useParams();
  const [item, itemError] = useFetch(FETCH_URL.GET_PRODUCT_DETAIL(id));
  const dispatch = useDispatch();

  const { image_url: image, name, price, product_id } = item;

  const addCart = id => async () => {
    try {
      const newCartItem = await API.addItemToCart(id);

      dispatch(addItemToCart(newCartItem));
      alert(MESSAGE.SUCCESS_ADD_ITEM_TO_CART);
    } catch (error) {
      console.error(error.message);
      alert(MESSAGE.FAIL_ADD_ITEM_TO_CART);
    }
  };

  return (
    <Component>
      <Thumbnail size="x-large" image={image} alt={`${name} 상품 이미지`} />
      <ProductSummary>
        <h2>{name}</h2>
        <Price>
          <p>{`금액`}</p>
          <p>{`${price?.toLocaleString('ko-KR')}원`}</p>
        </Price>
        <Button
          type="button"
          size="medium"
          width="100%"
          backgroundColor={COLOR.BROWN}
          onClick={addCart(product_id)}
        >
          장바구니
        </Button>
      </ProductSummary>
    </Component>
  );
};

export default ProductDetail;
