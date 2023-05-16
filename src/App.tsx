import { RouterProvider, createHashRouter } from 'react-router-dom';
import ProductListPage from './pages/ProductListPage';
import CartPage from './pages/CartPages';

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
