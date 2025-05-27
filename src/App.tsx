import GlobalStyle from './styles/GlobalStyles';
import { Global } from '@emotion/react';
import Layout from './pages/layout/Layout';

function App() {
  return (
    <>
      <Global styles={GlobalStyle} />
      <Layout />
    </>
  );
}

export default App;
