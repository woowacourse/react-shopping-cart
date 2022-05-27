import PageTemplate from '../../components/common/PageTemplate/PageTemplate';
import { fetchGetCartAsync } from '@/store/cart/action';
import * as Styled from './ShoppingCart.style';
import CartList from '@/components/cart/CartList/CartList';
import OrderForm from '@/components/order/OrderForm/OrderForm';
import ErrorContainer from '@/components/common/ErrorContainer/ErrorContainer';
import Loading from '@/components/common/Loading/Loading';
import { useThunkFetch } from '@/hooks/useFecth';
import { useCartList } from '@/hooks/useCartList';

function ShoppingCart() {
  const { isLoading, cartList } = useThunkFetch({
    selector: state => state.cart,
    thunkAction: fetchGetCartAsync,
    deps: [],
  });

  const {
    amount,
    cartItemStatusUtil: { checkCartItemLoading, checkCartItemChecked, checkEveryCartItemChecked },
    cartItemEvent: {
      decreaseCartItemCount,
      increaseCartItemCount,
      deleteCartItem,
      deleteEveryCartItem,
      checkCartItem,
      checkEveryCartItem,
    },
  } = useCartList();

  if (isLoading) {
    return (
      <Loading type="page" fontSize="2rem">
        👻
      </Loading>
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
          <CartList
            cartList={cartList}
            checkCartItemLoading={checkCartItemLoading}
            checkCartItemChecked={checkCartItemChecked}
            checkEveryCartItemChecked={checkEveryCartItemChecked}
            decreaseCartItemCount={decreaseCartItemCount}
            increaseCartItemCount={increaseCartItemCount}
            deleteCartItem={deleteCartItem}
            deleteEveryCartItem={deleteEveryCartItem}
            checkCartItem={checkCartItem}
            checkEveryCartItem={checkEveryCartItem}
          />
          <OrderForm amount={amount} />
        </Styled.Wrapper>
      </Styled.Container>
    </PageTemplate>
  );
}

export default ShoppingCart;
