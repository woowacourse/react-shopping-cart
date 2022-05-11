import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import './store/index';
import { actionTypes } from './store/actionTypes';
import { products } from './mock/productList';
import Header from './components/Header';
import { useRoutes } from 'react-router-dom';
import routes from './Routes';

function App() {
  const dispatch = useDispatch();
  const content = useRoutes(routes);

  useEffect(() => {
    dispatch({
      type: actionTypes.SET_PRODUCT_LIST,
      productList: products,
    });
  }, [dispatch]);

  return (
    <div className="App">
      <Header />
      {content}
    </div>
  );
}

export default App;
