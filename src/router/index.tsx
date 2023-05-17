import { createBrowserRouter } from 'react-router-dom';
import ProductList from 'src/pages/ProductList';

const CartRouter = createBrowserRouter([
  {
    path:"/",
    element:<ProductList/>

  },
],{basename:process.env.PUBLIC_URL})

export default CartRouter;
