import { useRecoilValue } from "recoil";
import { cartQuantitySelector } from "../../store/cartState";
import Styled from "./CartTextButtonStyled";
import { Link } from "react-router-dom";

const CartTextButton = () => {
  const cartQuantity = useRecoilValue(cartQuantitySelector);

  return (
    <Link to="/shopping-cart">
      <Styled.Container>
        <Styled.ShoppingCart>장바구니</Styled.ShoppingCart>
        {cartQuantity && (
          <Styled.CartQuantity>{cartQuantity}</Styled.CartQuantity>
        )}
      </Styled.Container>
    </Link>
  );
};

export default CartTextButton;
