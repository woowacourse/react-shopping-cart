import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';
import ProductItem from '../box/ProductItem';
import ErrorBox from '../common/ErrorBox/ErrorBox';
import { productsQuery } from '../../recoil/selector';

const ProductList = () => {
  const products = useRecoilValue(productsQuery);

  if (products.length === 0) return <ErrorBox errorType="emptyList" />;

  return (
    <ProductListWrapper>
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </ProductListWrapper>
  );
};

export default ProductList;

const ProductListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  justify-items: center;
  grid-column-gap: 47px;
  grid-row-gap: 75px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;
