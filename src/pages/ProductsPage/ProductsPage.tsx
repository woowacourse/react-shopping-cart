import React, { ReactElement, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import Styled from './ProductsPage.styles';
import * as T from '../../types';
import MESSAGE from '../../constants/messages';
import Spinner from '../../components/shared/Spinner/Spinner';
import ProductItem from '../../components/units/ProductItem/ProductItem';

import useAxios from '../../hooks/useAxios';
import API from '../../constants/api';
import useCart from '../../hooks/useCart';

const ProductsPage = (): ReactElement => {
  const { enqueueSnackbar } = useSnackbar();

  const { onAdd } = useCart();

  const [{ data: products, status, error }, fetchProducts] = useAxios(API.PRODUCTS);

  useEffect(() => {
    const getProducts = async () => {
      await fetchProducts();
    };
    getProducts();
  }, [fetchProducts]);

  useEffect(() => {
    if (error) {
      enqueueSnackbar(MESSAGE.GET_PRODUCTS_FAILURE);
    }
  }, [enqueueSnackbar, error]);

  return (
    <Styled.Root>
      {status === T.AsyncStatus.PENDING && (
        <Styled.SpinnerWrapper>
          <Spinner />
        </Styled.SpinnerWrapper>
      )}
      {status === T.AsyncStatus.SUCCESS && products?.length === 0 ? (
        <Styled.NoResultMessage>😢 지금은 구입할 수 있는 상품이 없어요!</Styled.NoResultMessage>
      ) : (
        <Styled.ProductList>
          {products?.map?.((product: T.Product) => (
            <li key={product.productId}>
              <ProductItem product={product} onClickCart={onAdd} />
            </li>
          ))}
        </Styled.ProductList>
      )}
    </Styled.Root>
  );
};

export default ProductsPage;
