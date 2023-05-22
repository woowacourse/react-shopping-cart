import ResetStyle from './styles/ResetStyle.tsx';
import GlobalStyle from './styles/GlobalStyle.tsx';
import Header from './components/Header/Header.tsx';
import Layout from './components/@common/Layout/Layout.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ListPage from './pages/ListPage/ListPage.tsx';
import { RecoilRoot } from 'recoil';
import UnloadHandler from './components/@common/UnloadHandler.tsx';
import CartPage from './pages/CartPage/CartPage.tsx';
import ErrorPage from './pages/ErrorPage/ErrorPage.tsx';

const App = () => {
  return (
    <RecoilRoot>
      <ResetStyle />
      <GlobalStyle />
      <BrowserRouter>
        <Header />
        <Layout>
          <Routes>
            <Route path='/' element={<ListPage />} />
            <Route path='/cart' element={<CartPage />} />
            <Route path='/error' element={<ErrorPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
      <UnloadHandler />
    </RecoilRoot>
  );
};

export default App;
