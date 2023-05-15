import ResetStyle from './styles/ResetStyle.tsx';
import GlobalStyle from './styles/GlobalStyle.tsx';
import Header from './components/Header/Header.tsx';
import Layout from './components/@common/Layout/Layout.tsx';
import { RecoilRoot } from 'recoil';
import Router from './router/Router.tsx';

const App = () => {
  return (
    <>
      <RecoilRoot>
        <ResetStyle />
        <GlobalStyle />
        <Header />
        <Layout>
          <Router />
        </Layout>
      </RecoilRoot>
    </>
  );
};

export default App;
