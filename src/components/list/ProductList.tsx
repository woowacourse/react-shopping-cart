import styled from '@emotion/styled';
import ProductItem from '../box/ProductItem';
import useDataFetching from '../../hooks/useDataFetching';
import type { Product } from '../../types/types';
import ErrorBox from '../common/ErrorBox/ErrorBox';
import { Text } from '../common/Text/Text';

const ProductList = () => {
  const { data, isLoading } = useDataFetching<Product[]>('./mock/mockData.json');
  if (isLoading) {
    return <Text>로딩중...</Text>;
  }
  if (!data) {
    return <ErrorBox errorType="network" />;
  }
  if (data.length === 0) {
    return <ErrorBox errorType="emptyList" />;
  }
  return (
    <ProductListWrapper>
      {data.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </ProductListWrapper>
  );
};

export default ProductList;

const ProductListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-items: center;
  grid-column-gap: 47px;
  grid-row-gap: 75px;
`;
