import { BrowserRouter as Router, Route } from 'react-router-dom';
import { NavBar, ShoppingCart, CompletedOrder, Products } from './components';
import GlobalStyle from './global.styles';
import { products, totalOrders } from '../src/mockData';

function App() {
  return (
    <Router>
      <div className="App">
        <GlobalStyle />
        <NavBar />

        <Route exact path={'/'}>
          <Products products={products} />
        </Route>
        <Route exact path="/carts">
          <ShoppingCart products={products} />
        </Route>
        <Route exact path="/completed-orders">
          <CompletedOrder orders={totalOrders} />
        </Route>
      </div>
    </Router>
  );
}

export default App;
