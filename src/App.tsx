import ResetStyle from './styles/ResetStyle.tsx';
import GlobalStyle from './styles/GlobalStyle.tsx';

import { RecoilRoot } from 'recoil';
import Router from './router/Router.tsx';

const App = () => {
  return (
    <>
      <RecoilRoot>
        <ResetStyle />
        <GlobalStyle />
        <Router />
      </RecoilRoot>
    </>
  );
};

export default App;
