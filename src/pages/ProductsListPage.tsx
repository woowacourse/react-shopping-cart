import styled from 'styled-components';

import Header from '../components/Common/Header';
import ProductList from '../components/Product/ProductList';

import products from '../data/products.json';

const ProductsListPage = () => {
  return (
    <>
      <Header />
      <Main>
        <ProductList products={products} />
      </Main>
    </>
  );
};

const Main = styled.main`
  max-width: 1300px;
  margin: 60px auto 0;
  padding: 0 0 100px 0;
`;

export default ProductsListPage;
