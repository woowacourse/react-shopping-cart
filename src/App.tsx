import { Global } from '@emotion/react';
import GlobalStyle from './styles/globalStyle';
import Layout from './components/Layout/Layout';
import Header from './components/Header/Header';

function App() {
  return (
    <>
      <Global styles={GlobalStyle} />
      <Layout>
        <Header title="SHOP" />
        <h1>react-shopping-cart</h1>
      </Layout>
    </>
  );
}

export default App;
