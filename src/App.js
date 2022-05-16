import { Provider } from 'react-redux';
import { store } from 'store/store';

import ProductList from 'page/ProductList/ProductList';

function App() {
  return (
    <Provider store={store}>
      <ProductList />
    </Provider>
  );
}

export default App;
