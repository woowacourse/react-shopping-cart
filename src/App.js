import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NotFound, ProductList, ShoppingCart } from 'pages';
import { PATH } from 'constants';

function App() {
  return (
    <Router basename={PATH.BASE_NAME}>
      <Routes>
        <Route path={PATH.PRODUCT_LIST_PAGE} element={<ProductList />} />
        <Route path={PATH.SHOPPING_CART_PAGE} element={<ShoppingCart />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
