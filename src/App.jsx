import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import './store/index';
import { actionTypes } from './store/actionTypes';
import { products } from './mock/productList';

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
      <button>click</button>
    </div>
  );
}

export default App;
