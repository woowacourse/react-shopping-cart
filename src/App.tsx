import { RecoilRoot } from 'recoil';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import { Layout } from './layout';

export const App = () => {
  return (
    <RecoilRoot>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/test" element={<Layout>테스트</Layout>} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
};
