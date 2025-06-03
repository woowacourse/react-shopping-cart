import styled from '@emotion/styled';
import { usePageContext } from '../contexts/PageContext';
import CartPage from './CartPage';
import OrderConfirmPage from './OrderConfirmPage';
import Header from '../components/Header';

const PageController = () => {
  const { page } = usePageContext();

  return (
    <S.container>
      <Header />
        {page === 'cart' && <CartPage />}
        {page === 'orderConfirm' && <OrderConfirmPage />}
    </S.container>
  );
};

export default PageController;

const S = {
  container: styled.div`
    height: 100vh;
  `,
};
