import { RouterProvider, createHashRouter } from 'react-router-dom';
import ProductListPage from './pages/ProductListPage/ProductListPage';
import CartPage from './pages/CartPage/CartPages';

const router = createHashRouter([
  {
    path: '/',
    element: <ProductListPage />,
  },
  {
    path: '/cart',
    element: <CartPage />,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
