import ResetStyle from './styles/ResetStyle.tsx';
import GlobalStyle from './styles/GlobalStyle.tsx';
import Header from './components/Header/Header.tsx';
import Layout from './components/@common/Layout/Layout.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ListPage from './pages/ListPage/ListPage.tsx';
import { RecoilRoot } from 'recoil';

const App = () => {
  return (
    <>
      <RecoilRoot>
        <ResetStyle />
        <GlobalStyle />
        <Header />
        <Layout>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<ListPage />} />
            </Routes>
          </BrowserRouter>
        </Layout>
      </RecoilRoot>
    </>
  );
};

export default App;
