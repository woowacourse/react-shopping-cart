import * as S from './ProductItemList.styles';
import ProductItem from 'components/Product/ProductItem';
import LoadingSkeleton from 'components/Product/ProductItem/LoadingSkeleton';
import { useGet } from 'hooks/useGet';
import { Product } from 'types';
import { getProductList } from 'api/requests';

const ProductItemList = () => {
  const { data, isLoading } = useGet<{ choonsik: Product[] }>(getProductList);

  const loading = Array.from({ length: 16 }).map((_, idx) => (
    <LoadingSkeleton key={idx} />
  ));

  const fetchedProductList =
    data &&
    data.choonsik.map((product) => (
      <ProductItem key={product.id} product={product} />
    ));

  return (
    <>
      <S.ProductListWrapper>
        {isLoading ? loading : fetchedProductList}
      </S.ProductListWrapper>
    </>
  );
};

export default ProductItemList;
