import { Route, Switch } from 'react-router-dom';

import Header from '../src/components/Header';
import ProductListPage from './pages/ProductListPage/ProductListPage';
import OrderListPage from '../src/pages/OrderListPage';
import CartPage from './pages/CartPage/CartPage';
import PaymentPage from './pages/PaymentPage/PaymentPage';
import NotFoundPage from '../src/pages/NotFoundPage';

import styled from 'styled-components';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 1440px;
  height: 100%;
  margin: 0 auto;
  padding: 60px;
`;

const App = () => {
  return (
    <div className="App">
      <Header />
      <PageWrapper>
        <Switch>
          <Route exact path={['/', '/products']} component={ProductListPage} />
          <Route exact path="/orders" component={OrderListPage} />
          <Route exact path="/cart" component={CartPage} />
          <Route exact path="/payment" component={PaymentPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </PageWrapper>
    </div>
  );
};

export default App;
