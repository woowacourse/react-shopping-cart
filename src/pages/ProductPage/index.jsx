import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Wrapper from './style';

import { getProduct } from 'reducers/product';
import { getCart } from 'reducers/cart';

const ProductPage = () => {
  const dispatch = useDispatch();
  const { loading: productLoading, data: product } = useSelector((state) => state.product);
  const { loading: cartLoading, data: cart } = useSelector((state) => state.cart);
  const { productId } = useParams();

  console.log(product, cart, productLoading, cartLoading);

  useEffect(() => {
    dispatch(getProduct(productId));
    dispatch(getCart(productId));
  }, [dispatch, productId]);

  if (productLoading || cartLoading) return '로딩';

  return (
    <Wrapper>
      <div className="product-wrapper">
        <img src={product.imgSrc} alt={`${product.title}상품`} />
        <div className="title-wrapper">
          <h3 className="title">{product.title}</h3>
        </div>
        <div className="bottom flex-row-space-between">
          <p>가격</p>
          <p>{product.price}</p>
        </div>
      </div>
    </Wrapper>
  );
};

export default ProductPage;
