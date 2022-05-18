import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProductList, ShoppingCart } from 'page';
import { PATH } from 'constant';

function App() {
  return (
    <Router basename={PATH.BASE_NAME}>
      <Routes>
        <Route path={PATH.PRODUCT_LIST_PAGE} element={<ProductList />} />
        <Route path={PATH.SHOPPING_CART_PAGE} element={<ShoppingCart />} />
      </Routes>
    </Router>
  );
}

export default App;
