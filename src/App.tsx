import { RecoilRoot } from 'recoil';
import { styled } from 'styled-components';
import CartTextButton from './components/CartTextButton';
import Header from './components/Header';
import ProductPage from './pages/ProductPage';

function App() {
  return (
    <RecoilRoot>
      <Header>
        <CartTextButton />
      </Header>
      <Layout>
        <ProductPage />
      </Layout>
    </RecoilRoot>
  );
}

export default App;

const Layout = styled.div`
  display: flex;
  justify-content: center;

  padding: 64px 0px;

  width: 100%;
`;
