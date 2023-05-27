import { Suspense } from 'react';

import { CartItem } from '@customTypes/Product';
import { useProductList } from './useProductList';

import { StyledProductList } from '@components/pages/ProductsPage/ProductList/ProductList.styled';
import ProductItem from '@components/pages/ProductsPage/ProductList/ProductItem/ProductItem';
import ErrorModal from '@components/pages/ErrorPage/ErrorModal/ErrorModal';

const ProductList = () => {
  const { productList, isGetProductListError } = useProductList();

  return (
    <Suspense fallback={<div>로딩중 ...</div>}>
      <ErrorModal isError={isGetProductListError} />
      <StyledProductList>
        {productList.map((item: CartItem) => {
          return (
            <ProductItem
              key={item.product.id}
              initQuantity={item.quantity}
              initCartItemId={`/${item.id}`}
              product={{ ...item.product }}
            />
          );
        })}
      </StyledProductList>
    </Suspense>
  );
};

export default ProductList;
