import PageTemplate from '../../components/common/PageTemplate/PageTemplate';
import { useThunkFetch } from '@/hooks/useFecth';
import { fetchGetCartAsync } from '@/store/cart/action';
import * as Styled from './ShoppingCart.style';
import CartList from '@/components/cart/CartList/CartList';
import OrderForm from '@/components/order/OrderForm/OrderForm';
import ErrorContainer from '@/components/common/ErrorContainer/ErrorContainer';

function ShoppingCart() {
  const { isLoading, cartList } = useThunkFetch({
    selector: state => state.cart,
    thunkAction: fetchGetCartAsync,
    deps: [],
  });

  if (isLoading) {
    return (
      <PageTemplate>
        <Styled.Container>
          <Styled.Title>장바구니</Styled.Title>
          <Styled.Wrapper>
            <ErrorContainer>로딩 중</ErrorContainer>
          </Styled.Wrapper>
        </Styled.Container>
      </PageTemplate>
    );
  }

  if (cartList.length === 0) {
    return (
      <PageTemplate>
        <Styled.Container>
          <Styled.Title>장바구니</Styled.Title>
          <Styled.Wrapper>
            <ErrorContainer>장바구니가 비어있습니다.</ErrorContainer>
          </Styled.Wrapper>
        </Styled.Container>
      </PageTemplate>
    );
  }

  return (
    <PageTemplate>
      <Styled.Container>
        <Styled.Title>장바구니</Styled.Title>
        <Styled.Wrapper>
          <CartList cartList={cartList} />
          <OrderForm />
        </Styled.Wrapper>
      </Styled.Container>
    </PageTemplate>
  );
}

export default ShoppingCart;
