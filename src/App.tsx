import router from '@routes/route';
import GlobalStyle from '@styles/globalStyle';
import { RouterProvider } from 'react-router-dom';
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
