import { router } from 'Router';
import { Routes, Route, BrowserRouter, RouterProvider } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import GlobalStyles from 'styles/GlobalStyles';

const App = () => {
  return (
    <>
      <GlobalStyles />
      <RecoilRoot>
        <RouterProvider router={router} />
      </RecoilRoot>
    </>
  );
};

export default App;
