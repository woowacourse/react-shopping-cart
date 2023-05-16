import { RouterProvider, createHashRouter } from 'react-router-dom';
import Header from './components/Header/Header';
import ProductListPage from './pages/ProductListPage/ProductListPage';

const router = createHashRouter([
  {
    path: '/',
    element: <ProductListPage />,
  },
  {
    path: '/cart',
    element: <div>asd</div>,
  },
]);

function App() {
  return (
    <div className="App">
      <Header />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
