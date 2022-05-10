import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import './store/index';
import { actionTypes } from './store/actionTypes';
import { products } from './mock/productList';
import ProductListPage from './pages/ProductListPage';
import Header from './components/Header';

function App() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  console.log('productList', productList);

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
