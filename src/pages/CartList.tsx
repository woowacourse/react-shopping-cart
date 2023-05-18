import { useEffect } from 'react';
import { styled } from 'styled-components';
import { useRecoilValue } from 'recoil';
import { cartIds } from 'recoil/cartList';
import ContentLayout from 'components/@common/ContentLayout';
import CartItem from 'components/CartItem';
import Header from 'components/Header';
import PaymentDetail from 'components/PaymentDetail';
import { useFetch } from 'hooks/useFetch';
import { type Cart } from 'types';

const CartList = () => {
  const cartIdArray = useRecoilValue(cartIds);
  const { data, api } = useFetch<{ cartList: Cart[] }>();

  useEffect(() => {
    api.get('/api/cart-items');
  }, [cartIdArray]);

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
