import axios from 'axios';
import { FC } from 'react';
import { Route, Switch } from 'react-router';
import NavigationBar from './components/NavigationBar';
import { API_BASE_URL } from './constants/API';
import OrderConfirmPage from './pages/OrderConfirmPage';
import OrderListPage from './pages/OrderListPage';
import ProductListPage from './pages/ProductListPage';
import ShoppingCartPage from './pages/ShoppingCartPage';

//TODO: 이거 파일로 뺄까...?
axios.defaults.baseURL = API_BASE_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';

const App: FC = () => {
  return (
    <div className="App">
      <NavigationBar />
      <Switch>
        <Route path="/" exact component={ProductListPage} />
        <Route path="/shoppingCart" component={ShoppingCartPage} />
        <Route path="/orderList" component={OrderListPage} />
        <Route path="/orderConfirm" component={OrderConfirmPage} />
      </Switch>
    </div>
  );
};

export default App;
