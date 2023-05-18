import { styled } from 'styled-components';
import Header from '../components/common/Header/Header';
import CartList from '../components/cart/CartList/CartList';
import PaymentAmount from '../components/cart/PaymentAmount/PaymentAmount';

const CartPage = () => {
  return (
    <>
      <Header />
      <Layout>
        <Title>장바구니</Title>
        <Contents>
          <CartList />
          <PaymentAmount />
        </Contents>
      </Layout>
    </>
  );
};

const Layout = styled.main`
  margin: 0 auto;

  padding: 80px 0;
  width: 1320px;
`;

const Title = styled.h2`
  font-weight: 700;
  font-size: 32px;

  padding: 30px 0;
  border-bottom: 4px solid #333333;

  text-align: center;
`;

const Contents = styled.div`
  display: flex;
  justify-content: space-between;

  margin-top: 34px;
`;

export default CartPage;
