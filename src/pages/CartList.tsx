import { styled } from 'styled-components';
import ContentLayout from 'components/@common/ContentLayout';
import Header from 'components/Header';
import PaymentDetail from 'components/PaymentDetail';
import CartItemList from 'components/CartItemList';

const CartList = () => {
  return (
    <>
      <Header />
      <ContentLayout>
        <Container>
          <CartItemList />
          <PaymentDetail />
        </Container>
      </ContentLayout>
    </>
  );
};

const Container = styled.div`
  display: flex;
`;

export default CartList;
