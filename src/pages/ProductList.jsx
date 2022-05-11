import ProductItem from 'components/ProductItem';
import Layout from 'components/Layout';
import * as Styled from './styles';

export const ProductList = () => (
  <Layout>
    <Styled.ProductListWrapper>
      {Array.from({ length: 12 }).map((_, i) => (
        <ProductItem id={i} image="" name="좋은 상품" price={10000} />
      ))}
    </Styled.ProductListWrapper>
  </Layout>
);

export default ProductList;
