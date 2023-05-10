import { styled } from 'styled-components';
import './App.css';
import Header from './components/Header/Header';
import ProductList from './components/ProductList/ProductList';
import { useRecoilValue } from 'recoil';
import { productListQuery } from './selectors';

function App() {
  const products = useRecoilValue(productListQuery);

  return (
    <div className="App">
      <Header />
      <Layout>
        <ProductList products={products} />
      </Layout>
    </div>
  );
}

const Layout = styled.main`
  padding: 60px 0;

  @media screen and (min-width: 1200px) {
    display: flex;
    justify-content: center;
  }
`;

export default App;
