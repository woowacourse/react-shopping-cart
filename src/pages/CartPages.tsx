import { styled } from 'styled-components';
import Header from '../components/common/Header/Header';

const CartPage = () => {
  return (
    <>
      <Header />
      <Layout>CartPage</Layout>
    </>
  );
};

const Layout = styled.main`
  padding: 130px 300px;
`;

export default CartPage;
