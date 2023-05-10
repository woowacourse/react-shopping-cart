import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import Header from './components/Header';
import ProductItem from './components/ProductItem';
import ProductList from './components/ProductList';
import GlobalStyle from './styles/GlobalStyle';
import ResetStyle from './styles/ResetStyle';
import type { Product } from './type';

const Content = styled.main`
  margin: 0 auto;
  margin-top: 60px;
  padding: 0 24px;

  max-width: 1300px;
`;

const App = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const getProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch('./products.json');
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      const error = err as Error;
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <ResetStyle />
      <GlobalStyle />

      <Header />

      <Content>
        <ProductList>
          {loading ? (
            <div>loading</div>
          ) : (
            products.map((product) => <ProductItem key={product.id} product={product} />)
          )}
        </ProductList>
      </Content>
    </>
  );
};

export default App;
