import { RecoilRoot } from 'recoil';

import * as Styled from './App.styled';
import Header from '../Header/Header';
import ProductsPage from '../pages/ProductsPage/ProductsPage';

const App = () => {
  return (
    <Styled.App>
      <RecoilRoot>
        <Header />
        <ProductsPage />
      </RecoilRoot>
    </Styled.App>
  );
};

export default App;
