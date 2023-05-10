import { Routes, Route } from 'react-router-dom';
import GlobalStyles from 'styles/GlobalStyles';
import Layout from 'components/Layout/Layout';
import ROUTE_PATH from 'constants/routePath';
import ProductListPage from 'pages/ProductListPage';

const App = () => {
  return (
    <>
      <GlobalStyles />
      <Routes>
        <Route path={ROUTE_PATH.root} element={<Layout />}>
          <Route index element={<ProductListPage />} />
          <Route path={ROUTE_PATH.cart} element={<div>cart</div>} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
