import { styled } from 'styled-components';
import Header from '../components/common/Header/Header';

const CartPage = () => {
  return (
    <>
      <Header />
      <Layout>
        <Title>장바구니</Title>
      </Layout>
    </>
  );
};

const Layout = styled.main`
  padding: 80px;
  width: 1320px;
`;

const Title = styled.h2`
  font-weight: 700;
  font-size: 32px;

  padding: 30px 0;
  border-bottom: 4px solid #333333;

  text-align: center;
`;

export default CartPage;
