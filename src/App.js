import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import GlobalStyles from './GlobalStyles';
import NavBar from './components/NavBar/NavBar';
import { ROUTE } from './constants';
import ProductListPage from './pages/ProductListPage/ProductListPage';
import OrderListPage from './pages/OrderListPage/OrderListPage';

const App = () => (
  <>
    <GlobalStyles />
    <Router>
      <NavBar />

      <Switch>
        <Route exact path={ROUTE.HOME} component={ProductListPage} />
        <Route exact path={ROUTE.ORDER_LIST} component={OrderListPage} />
      </Switch>
    </Router>
  </>
);

export default App;
