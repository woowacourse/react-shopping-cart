import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Product from 'components/Product';

import Skeleton from 'skeletons/ProductSkeleton';

import { getProducts } from 'reducers/products';
import { getCarts } from 'reducers/carts';

import Wrapper from './style';

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { productLoading, data: products } = useSelector((state) => state.products);
  const { cartLoading, data: carts } = useSelector((state) => state.carts);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCarts());
  }, [dispatch]);

  if (productLoading || cartLoading) {
    return <Skeleton />;
  }

  return (
    <Wrapper>
      {products?.map((product) => {
        const cart = carts.find(({ id }) => id === product.id);

        return <Product key={product.id} {...product} cartQuantity={cart ? cart.quantity : 0} />;
      })}
    </Wrapper>
  );
};

export default ProductsPage;
