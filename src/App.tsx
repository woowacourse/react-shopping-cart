import { Routes, Route } from 'react-router-dom';
import GlobalStyles from 'styles/GlobalStyles';
import Layout from 'components/Layout/Layout';
import ROUTE_PATH from 'constants/routePath';

const App = () => {
  return (
    <>
      <GlobalStyles />
      <Routes>
        <Route path={ROUTE_PATH.root} element={<Layout />}>
          <Route index element={<div>itemList</div>} />
          <Route path={ROUTE_PATH.cart} element={<div>cart</div>} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
