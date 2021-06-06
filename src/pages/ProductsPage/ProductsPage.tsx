import React, { ReactElement, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import Styled from './ProductsPage.styles';
import * as T from '../../types';
import MESSAGE from '../../constants/messages';
import Spinner from '../../components/shared/Spinner/Spinner';
import ProductItem from '../../components/units/ProductItem/ProductItem';
import useCart from '../../hooks/useCart';
import useProduct from '../../hooks/useProduct';

const ProductsPage = (): ReactElement => {
  const { enqueueSnackbar } = useSnackbar();

  const { data: products, status, error } = useProduct();
  const { onAdd } = useCart();

  const isInitialLoading = status === T.AsyncStatus.PENDING && products.length === 0;
  const isEmptyData = status === T.AsyncStatus.SUCCESS && products?.length === 0;

  useEffect(() => {
    if (error) enqueueSnackbar(error?.message || MESSAGE.GET_PRODUCTS_FAILURE);
  }, [enqueueSnackbar, error]);

  return (
    <Styled.Root>
      {isInitialLoading && (
        <Styled.SpinnerWrapper>
          <Spinner />
        </Styled.SpinnerWrapper>
      )}
      {isEmptyData ? (
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
