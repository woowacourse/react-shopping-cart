import * as S from './styled';

import getProducts from '@api/get/getProducts';
import useFetch from '@hooks/useFetch';
import ProductItem from '@components/Admin/ProductItem/ProductItem';

const ProductList = () => {
  const { data } = useFetch(getProducts);

  return (
    <S.Container>{data?.map(item => <ProductItem key={item.id} product={item} />)}</S.Container>
  );
};

export default ProductList;
