import { RouterProvider } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import router from './router';
import GlobalStyle from './styles/GlobalStyle';
import ResetStyle from './styles/ResetStyle';

const App = () => {
  return (
    <RecoilRoot>
      <ResetStyle />
      <GlobalStyle />

      <RouterProvider router={router} />
    </RecoilRoot>
  );
};

export default App;
