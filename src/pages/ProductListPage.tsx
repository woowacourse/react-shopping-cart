import { styled } from 'styled-components';
import { Suspense } from 'react';
import Header from '../components/common/Header/Header';
import ProductList from '../components/product/ProductList/ProductList';

const ProductListPage = () => {
  return (
    <>
      <Header />
      <Layout>
        {/* <Suspense fallback={<p>로딩중..</p>}> */}
        <ProductList />
        {/* </Suspense> */}
      </Layout>
    </>
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
