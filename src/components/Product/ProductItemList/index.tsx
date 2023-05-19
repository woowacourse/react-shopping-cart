import * as S from './ProductItemList.styles';
import ProductItem from 'components/Product/ProductItem';
import LoadingSkeleton from 'components/Product/ProductItem/LoadingSkeleton';
import { useFetch } from 'hooks/useFetch';
import { useEffect } from 'react';
import { Product } from 'types';

const ProductItemList = () => {
  const { data, isLoading, api } = useFetch<{ choonsik: Product[] }>();

  useEffect(() => {
    api.get('/api/products');
  }, []);

  const loading =
    isLoading &&
    Array.from({ length: 16 }).map((_, idx) => <LoadingSkeleton key={idx} />);

  const fetchedProductList =
    data &&
    data.choonsik.map((product) => (
      <ProductItem key={product.id} product={product} />
    ));
  return (
    <>
      <S.ProductListWrapper>
        {loading}
        {fetchedProductList}
      </S.ProductListWrapper>
    </>
  );
};

export default ProductItemList;
