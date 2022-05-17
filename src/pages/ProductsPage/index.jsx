import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Product from 'components/Product';

import Skeleton from 'skeletons/ProductSkeleton';

import { getProducts } from 'reducers/products';

import Wrapper from './style';

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { loading, data: products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  if (loading) {
    return <Skeleton />;
  }

  return (
    <Wrapper>
      {products?.map((product) => (
        <Product key={product.id} {...product} />
      ))}
    </Wrapper>
  );
};

export default ProductsPage;
