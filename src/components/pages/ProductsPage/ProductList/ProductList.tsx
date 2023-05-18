import { useCallback, useEffect } from 'react';
import { useRecoilValue } from 'recoil';

import { Product } from '@customTypes/Product';
import { productIdsSelector } from '@recoil/selector';
import useFetch from '@hooks/useFetch';

import { StyledProductList } from '@components/pages/ProductsPage/ProductList/ProductList.styled';
import ProductItem from '@components/pages/ProductsPage/ProductList/ProductItem/ProductItem';
import ErrorModal from '@components/pages/ErrorPage/ErrorModal/ErrorModal';
import { FetchedDataList } from '@components/commons/FetchedDataList/FetchedDataList';

const ProductList = () => {
  const { postData, patchData, deleteData } = useFetch('/cart-items');
  const productIds = useRecoilValue(productIdsSelector);

  const handleProductListPageExit = useCallback(() => {
    window.addEventListener('beforeunload', () => {
      // postData();
    });
  }, []);

  useEffect(() => {
    handleProductListPageExit();
  }, [handleProductListPageExit]);

  console.log(productIds);

  return (
    <FetchedDataList<Product[]> endpoint={'/products'} initialValue={[]}>
      {({ data, isError }) => {
        return (
          <>
            <ErrorModal isError={isError} />
            <StyledProductList>
              {data.map((item: Product) => (
                <ProductItem key={item.id} product={{ ...item }} />
              ))}
            </StyledProductList>
          </>
        );
      }}
    </FetchedDataList>
  );
};

export default ProductList;
