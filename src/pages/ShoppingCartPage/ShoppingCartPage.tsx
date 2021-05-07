import Checkbox from '../../components/commons/Checkbox/Checkbox';
import PageTitle from '../../components/commons/PageTitle/PageTitle';
import PaymentCheckout from '../../components/commons/PaymentCheckout/PaymentCheckout';
import CartItem from '../../components/ShoppingCartPage/CartItem/CartItem';
import * as Styled from './ShoppingCartPage.styles';

const ShoppingCartPage = () => {
  return (
    <Styled.ShoppingCartPage>
      <Styled.Header>
        <PageTitle>장바구니</PageTitle>
      </Styled.Header>
      <Styled.PageWrapper>
        <Styled.Container>
          <Styled.CartContainer>
            <Styled.ControlWrapper>
              <Checkbox labelText="선택해제" />
              <Styled.DeleteButton>상품삭제</Styled.DeleteButton>
            </Styled.ControlWrapper>
            <Styled.CartHeaderWrapper>
              <Styled.CartHeader>배송상품 (3개)</Styled.CartHeader>
            </Styled.CartHeaderWrapper>
            <Styled.CartItemList>
              <Styled.CartItemWrapper>
                <CartItem name="상품이름" price="18,900" />
              </Styled.CartItemWrapper>
              <Styled.CartItemWrapper>
                <CartItem name="상품이름" price="18,900" />
              </Styled.CartItemWrapper>
              <Styled.CartItemWrapper>
                <CartItem name="상품이름" price="18,900" />
              </Styled.CartItemWrapper>
            </Styled.CartItemList>
          </Styled.CartContainer>
        </Styled.Container>
        <Styled.PaymentCheckoutWrapper>
          <PaymentCheckout title="결제예상금액" priceLabel="결제예상금액" price="21,700" buttonText="주문하기(2개)" />
        </Styled.PaymentCheckoutWrapper>
      </Styled.PageWrapper>
    </Styled.ShoppingCartPage>
  );
};

export default ShoppingCartPage;
