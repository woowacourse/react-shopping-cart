import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadCarts, loadProducts } from './store/actions';
import GlobalStyle from './GlobalStyle';
import ProductListContainer from './components/Main/ProductListContainer';
import Header from './components/Header/Header';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadProducts());
    dispatch(loadCarts());
  }, []);

  return (
    <div className="App">
      <GlobalStyle />
      <Header />
      <ProductListContainer />
    </div>
  );
}

export default App;
