import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { getProduct } from 'actions/products';
import Layout from 'components/Layout';
import EmptyProductItem from 'components/EmptyProductItem';
import DetailProductItem from 'components/DetailProductItem';
import SkeletonProductItem from 'components/SkeletonProductItem';
import * as Styled from './styles';

const ProductDetail = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { item: product, isLoading, errorMessage } = useSelector((state) => state.product);

  const id = searchParams.get('id');

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  return (
    <Layout>
      <Styled.ProductDetailWrapper>
        {errorMessage && <h1>{errorMessage}</h1>}
        {isLoading && <SkeletonProductItem />}
        {isLoading ||
          (product ? (
            <DetailProductItem
              key={product.id}
              id={Number(product.id)}
              thumbnail={product.thumbnail}
              name={product.name}
              price={Number(product.price)}
            />
          ) : (
            <EmptyProductItem />
          ))}
      </Styled.ProductDetailWrapper>
    </Layout>
  );
};

export default ProductDetail;

/**
 *
 */
