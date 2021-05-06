import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import GlobalStyles from './GlobalStyles';
import NavBar from './components/NavBar/NavBar';
import { ROUTE } from './constants';
import ProductListPage from './pages/ProductListPage/ProductListPage';

const App = () => (
  <>
    <GlobalStyles />
    <Router>
      <NavBar />

      <Switch>
        <Route exact path={ROUTE.HOME} component={ProductListPage} />
      </Switch>
    </Router>
  </>
);

export default App;
