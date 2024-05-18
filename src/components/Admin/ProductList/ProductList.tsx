import getProducts from '../../../api/get/getProducts';
import useFetch from '../../../hooks/useFetch';
import ProductItem from '../ProductItem/ProductItem';
import * as S from './styled';

const ProductList = () => {
  const { data } = useFetch(getProducts);

  return (
    <S.Container>{data?.map(item => <ProductItem key={item.id} product={item} />)}</S.Container>
  );
};

export default ProductList;
