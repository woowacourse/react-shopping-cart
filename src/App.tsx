import { styled } from 'styled-components';
import Header from './components/Header/Header';
import ProductList from './components/ProductList/ProductList';

function App() {
  return (
    <div className="App">
      <Header />
      <Layout>
        <ProductList />
      </Layout>
    </div>
  );
}

const Layout = styled.main`
  padding: 140px 0 60px 0;

  @media screen and (min-width: 1200px) {
    display: flex;
    justify-content: center;
  }
`;

export default App;
