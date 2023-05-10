import { RecoilRoot } from 'recoil';

import * as Styled from './App.styled';
import Header from '../Header/Header';
import ProductsPage from '../pages/ProductsPage/ProductsPage';

const App = () => {
  return (
    <RecoilRoot>
      <Styled.App>
        <Header />
        <ProductsPage />
      </Styled.App>
    </RecoilRoot>
  );
};

export default App;
