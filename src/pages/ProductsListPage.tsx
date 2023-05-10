import styled from 'styled-components';
import { RecoilRoot } from 'recoil';

import Header from '../components/Common/Header';
import ProductList from '../components/Product/ProductList';

import products from '../data/products.json';

const ProductsListPage = () => {
  return (
    <RecoilRoot>
      <Header />
      <Main>
        <ProductList products={products} />
      </Main>
    </RecoilRoot>
  );
};

const Main = styled.main`
  max-width: 1300px;
  margin: 60px auto 0;
  padding: 0 0 100px 0;
`;

export default ProductsListPage;
