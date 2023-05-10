import { styled } from 'styled-components';
import Header from './components/Header';
import ProductItem from './components/ProductItem';
import ProductList from './components/ProductList';
import products from './fixtures/products.json';
import GlobalStyle from './styles/GlobalStyle';
import ResetStyle from './styles/ResetStyle';

const Content = styled.main`
  margin: 0 auto;
  margin-top: 60px;
  padding: 0 24px;

  max-width: 1300px;
`;

const App = () => {
  return (
    <>
      <ResetStyle />
      <GlobalStyle />

      <Header />

      <Content>
        <ProductList>
          {products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </ProductList>
      </Content>
    </>
  );
};

export default App;
