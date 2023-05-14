import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PATH } from './constants';
import MainPage from './pages/MainPage';

const { MAIN_PAGE } = PATH;

const App = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path={MAIN_PAGE} element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
