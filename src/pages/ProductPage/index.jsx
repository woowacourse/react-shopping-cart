import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import ProductQuantity from 'components/ProductQuantity';

import Skeleton from 'skeletons/ProductDetailSkeleton';

import Wrapper from './style';

import { getProduct } from 'reducers/product';
import { getCart } from 'reducers/cart';

const ProductPage = () => {
  const dispatch = useDispatch();
  const { loading: productLoading, data: product } = useSelector((state) => state.product);
  const { loading: cartLoading, data: cart } = useSelector((state) => state.cart);
  const { productId } = useParams();

  useEffect(() => {
    dispatch(getProduct(productId));
    dispatch(getCart(productId));
  }, [dispatch, productId]);

  if (productLoading || cartLoading) return <Skeleton />;

  return (
    <Wrapper>
      <div className="product-wrapper">
        <img src={product.imgSrc} alt={`${product.title}상품`} />
        <div className="top">
          <ProductQuantity
            productId={productId}
            productTitle={product.title}
            cartQuantity={cart ? cart.quantity : 0}
          >
            <p className="title">{product.title}</p>
          </ProductQuantity>
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
