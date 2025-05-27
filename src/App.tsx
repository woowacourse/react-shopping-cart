import { Global } from '@emotion/react';
import GlobalStyle from './styles/globalStyle';

function App() {
  return (
    <>
      <Global styles={GlobalStyle} />
      <h1>react-shopping-cart</h1>
    </>
  );
}

export default App;
