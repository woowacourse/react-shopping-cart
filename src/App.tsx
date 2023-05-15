import { RouterProvider } from 'react-router-dom';
import GlobalStyle from './GlobalStyle';
import router from './router';
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <RecoilRoot>
      <GlobalStyle />
      <RouterProvider router={router} />
    </RecoilRoot>
  );
}

export default App;
