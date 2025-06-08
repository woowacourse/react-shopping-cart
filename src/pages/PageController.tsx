import styled from '@emotion/styled';
import { usePageContext } from '../contexts/Page/PageContext';
import CartPage from './CartPage';
import OrderPriceConfirmPage from './OrderPriceConfirmPage';
import Header from '../components/Header';

const PageController = () => {
  const { page } = usePageContext();

  return (
    <S.container>
      <Header />
      {page === 'cart' && <CartPage />}
      {page === 'orderPriceConfirm' && <OrderPriceConfirmPage />}
    </S.container>
  );
};

export default PageController;

const S = {
  container: styled.div`
    height: 100vh;
  `,
};
