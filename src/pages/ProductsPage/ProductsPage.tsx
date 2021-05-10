import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../../components/shared/Spinner/Spinner';
import ProductItem from '../../components/units/ProductItem/ProductItem';
import { RootState } from '../../modules';
import { getProductsRequest } from '../../modules/products/actions';
import Styled from './ProductsPage.styles';

const ProductsPage = () => {
  const { isLoading, data } = useSelector((state: RootState) => state.productsReducer.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsRequest());
  }, [dispatch]);

  return (
    <Styled.Root>
      {isLoading ? (
        <Styled.SpinnerWrapper>
          <Spinner />
        </Styled.SpinnerWrapper>
      ) : (
        <Styled.ProductList>
          {data.map((product) => (
            <li key={product.id}>
              <ProductItem title={product.name} price={product.price} imageUrl={product.image} />
            </li>
          ))}
        </Styled.ProductList>
      )}
    </Styled.Root>
  );
};

export default ProductsPage;
