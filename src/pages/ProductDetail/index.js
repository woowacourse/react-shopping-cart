import React, { useState } from 'react';
import { useParams } from 'react-router';
import { Button, Card, NumericInput } from '../../components/shared';
import Thumbnail from '../../components/shared/Thumbnail';
import { COLOR, FETCH_URL } from '../../constants';
import useFetch from '../../request/useFetch';
import { Component, ProductSummary, Price, ButtonSet, Quantity } from './style';

const ProductDetail = () => {
  const { id } = useParams();
  const [item, itemError] = useFetch(FETCH_URL.GET_PRODUCT_DETAIL(id));
  const [quantity, setQuantity] = useState(1);

  const { image_url: image, name, price, product_id } = item;

  return (
    <Component>
      <Thumbnail size="x-large" image={image} alt={`${name} 상품 이미지`} />
      <ProductSummary>
        <h2>{name}</h2>
        <Price>
          <p>{`금액`}</p>
          <p>{`${price?.toLocaleString('ko-KR')}원`}</p>
        </Price>
        <Button size="medium" width="100%" backgroundColor={COLOR.BROWN}>
          장바구니
        </Button>
      </ProductSummary>
    </Component>
  );
};

export default ProductDetail;
