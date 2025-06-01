import CartContent from "../components/Cart/CartContent/CartContent";
import CartHeader from "../components/Cart/CartHeader/CartHeader";
import * as Styled from "./Cart.style";

function Cart() {
  return (
    <Styled.Container>
      <Styled.Wrapper>
        <CartHeader />
        <CartContent />
      </Styled.Wrapper>
    </Styled.Container>
  );
}

export default Cart;
