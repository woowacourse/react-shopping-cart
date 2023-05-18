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
        <Title>🛒 장바구니 🛒</Title>
        <Container>
          <CartItemList />
          <PaymentDetailWrapper>
            <PaymentDetail />
          </PaymentDetailWrapper>
        </Container>
      </ContentLayout>
    </>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 60px;
`;

const Title = styled.h1`
  height: 60px;
  margin-bottom: 32px;
  text-align: center;
  font: ${(props) => props.theme.font.large};
  border-bottom: 4px solid ${(props) => props.theme.color.primary};
`;

const PaymentDetailWrapper = styled.div`
  position: fixed;
  right: 60px;
`;

export default CartList;
