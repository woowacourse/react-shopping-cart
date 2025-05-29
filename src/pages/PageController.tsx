import { usePageContext } from '../contexts/PageContext';
import CartPage from './CartPage';
import OrderConfirmPage from './OrderConfirmPage';

const PageController = () => {
  const { page } = usePageContext();

  return (
    <>
      {page === 'cart' && <CartPage />}
      {page === 'orderConfirm' && <OrderConfirmPage />}
    </>
  );
};

export default PageController;
