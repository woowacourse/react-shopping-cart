import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import Product from 'components/Product';
import Pagenation from 'components/Pagenation';

import Skeleton from 'skeletons/ProductSkeleton';

import Wrapper from './style';

import { getProducts } from 'reducers/products';
import { getCarts } from 'reducers/carts';

import { PAGING } from 'constants';

const ProductsPage = () => {
  const dispatch = useDispatch();
  const {
    loading: productLoading,
    data: products,
    totalCount,
  } = useSelector((state) => state.products);
  const { loading: cartLoading, data: carts } = useSelector((state) => state.carts);
  const page = Number(useParams().page) || 1;

  useEffect(() => {
    dispatch(getProducts(page));
  }, [dispatch, page]);

  useEffect(() => {
    dispatch(getCarts());
  }, [dispatch]);

  if (productLoading || cartLoading) {
    return <Skeleton />;
  }

  return (
    <Wrapper>
      <div className="body">
        {products?.map((product) => {
          const cart = carts.find(({ id }) => id === product.id);

          return <Product key={product.id} {...product} cartQuantity={cart ? cart.quantity : 0} />;
        })}
      </div>
      <div className="footer">
        <Pagenation
          endPoint="products"
          totalCount={totalCount}
          currentPage={page}
          viewCount={PAGING.VIEW_COUNT}
        />
      </div>
    </Wrapper>
  );
};

export default ProductsPage;
