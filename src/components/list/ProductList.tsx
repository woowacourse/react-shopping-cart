import styled from '@emotion/styled';
import ProductItem from '../box/ProductItem';
import useDataFetching from '../../hooks/useDataFetching';
import type { Product } from '../../types/types';
import ErrorBox from '../common/ErrorBox/ErrorBox';
import { Text } from '../common/Text/Text';

const ProductList = () => {
  const { data, isLoading } = useDataFetching<Product[]>('./mock/mockData.json');

  return (
    <>
      {!isLoading ? (
        data ? (
          data.length > 0 ? (
            <ProductListWrapper>
              {data.map((product) => (
                <ProductItem key={product.id} product={product} />
              ))}
            </ProductListWrapper>
          ) : (
            <ErrorBox errorType="emptyList" />
          )
        ) : (
          <ErrorBox errorType="network" />
        )
      ) : (
        <Text>로딩중...</Text>
      )}
    </>
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
