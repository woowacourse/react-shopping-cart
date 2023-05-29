import CartPriceSummary from '../../components/CartPage/CartPriceSummary/CartPriceSummary';
import CartProductSummary from '../../components/CartPage/CartProductSummary/CartProductSummary';
import * as Styled from './CartPage.styles';

const CartPage = () => {
  return (
    <Styled.Wrapper>
      <Styled.Title>장바구니</Styled.Title>
      <Styled.Content>
        <CartProductSummary />
        <CartPriceSummary />
      </Styled.Content>
    </Styled.Wrapper>
  );
};
export default CartPage;
