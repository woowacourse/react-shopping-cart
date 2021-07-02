import React, { ReactElement } from 'react';
import * as T from 'types';
import Spinner from 'components/shared/Spinner/Spinner';
import ProductItem from 'components/units/ProductItem/ProductItem';
import useCart from 'hooks/useCart';
import useProduct from 'hooks/useProduct';
import Styled from './ProductsPage.styles';

const ProductsPage = (): ReactElement => {
  const { data: products, status } = useProduct();
  const { addItem } = useCart();

  const isInitialLoading = status === T.AsyncStatus.PENDING && products.length === 0;
  const isEmptyData = status === T.AsyncStatus.SUCCESS && products?.length === 0;

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
              <ProductItem product={product} onClickCart={addItem} />
            </li>
          ))}
        </Styled.ProductList>
      )}
    </Styled.Root>
  );
};

export default ProductsPage;
