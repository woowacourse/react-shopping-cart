import { BrowserRouter as Router, Route } from 'react-router-dom';
import { NavBar, ShoppingCart, CompletedOrder, Products } from './components';
import GlobalStyle from './global.styles';
import { products, totalOrders } from '../src/mockData';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import productReducer from './reducers/products';

const reducer = combineReducers({
  product: productReducer,
});

const store = createStore(reducer);

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <GlobalStyle />
          <NavBar />

          <Route exact path="/">
            <Products products={products} />
          </Route>
          <Route exact path="/cart">
            <ShoppingCart products={products} />
          </Route>
          <Route exact path="/completed-orders">
            <CompletedOrder orders={totalOrders} />
          </Route>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
