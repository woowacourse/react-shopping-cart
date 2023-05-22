import * as Styled from './CartPage.styles.tsx';
import CartSelectList from '../../components/CartPageComponents/CartSelectList/CartSelectList.tsx';
import CartPriceBox from '../../components/CartPageComponents/CartPriceBox/CartPriceBox.tsx';

const CartPage = () => {
  return (
    <Styled.CartPageContainer>
      <Styled.CartMainText>장바구니</Styled.CartMainText>
      <Styled.MainTextBorder />

      <Styled.CartSelectListContainer>
        <CartSelectList />
        <CartPriceBox />
      </Styled.CartSelectListContainer>
    </Styled.CartPageContainer>
  );
};

export default CartPage;
