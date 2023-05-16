import { styled } from 'styled-components';
import ProductList from '../../components/ProductList/ProductList';

const ProductListPage = () => {
  return (
    <Layout>
      <ProductList />;
    </Layout>
  );
};

const Layout = styled.main`
  padding: 140px 0 60px 0;

  @media screen and (min-width: 1200px) {
    display: flex;
    justify-content: center;
  }
`;

export default ProductListPage;
