import { useEffect } from 'react';
import { styled } from 'styled-components';
import ContentLayout from 'components/@common/ContentLayout';
import CartItem from 'components/CartItem';
import Header from 'components/Header';
import { useFetch } from 'hooks/useFetch';
import { type Cart } from 'types';
import PaymentDetail from 'components/PaymentDetail';

const CartList = () => {
  const { data, api } = useFetch<{ cartList: Cart[] }>();

  useEffect(() => {
    api.get('/api/cart-items');
  }, []);

  const fetchedCartList =
    data &&
    data.cartList?.map((cartItem) => (
      <CartItem cartItem={cartItem} key={cartItem.id} />
    ));

  return (
    <>
      <Header />
      <ContentLayout>
        <Container>
          <ItemWrapper>
            <Title>장바구니</Title>
            <CartItemTitle>든든배송 상품(3개)</CartItemTitle>
            {fetchedCartList}
          </ItemWrapper>
          <PaymentDetail totalPrice={1000} />
        </Container>
      </ContentLayout>
    </>
  );
};

const Container = styled.div`
  display: flex;
`;

const ItemWrapper = styled.div`
  width: 600px;
  margin: 0 60px;
`;

const Title = styled.h1`
  height: 60px;
  margin-bottom: 32px;
  text-align: center;
  font: ${(props) => props.theme.font.large};
  border-bottom: 4px solid ${(props) => props.theme.color.primary};
`;

const CartItemTitle = styled.p`
  padding-bottom: 24px;
  margin-bottom: 24px;
  font: ${(props) => props.theme.font.medium};
  border-bottom: 4px solid ${(props) => props.theme.color.gray};
`;

export default CartList;
