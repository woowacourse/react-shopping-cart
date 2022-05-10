import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import './store/index';
import { actionTypes } from './store/actionTypes';
import { products } from './mock/productList';
import ProductListPage from './pages/ProductListPage';
import Header from './components/Header';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: actionTypes.SET_PRODUCT_LIST,
      productList: products,
    });
  }, [dispatch]);

  return (
    <div className="App">
      <Header />
      <ProductListPage />
    </div>
  );
}

export default App;
