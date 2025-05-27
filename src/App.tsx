import { Global } from '@emotion/react';
import GlobalStyle from './styles/globalStyle';
import Layout from './components/Layout/Layout';

function App() {
  return (
    <>
      <Global styles={GlobalStyle} />
      <Layout>
        <h1>react-shopping-cart</h1>
      </Layout>
    </>
  );
}

export default App;
