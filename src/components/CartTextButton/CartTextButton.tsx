import { useRecoilValue } from "recoil";
import { cartQuantitySelector } from "../../store/cartState";
import Styled from "./CartTextButtonStyled";

const CartTextButton = () => {
  const cartQuantity = useRecoilValue(cartQuantitySelector);

  return (
    <Styled.Container>
      <Styled.ShoppingCart>장바구니</Styled.ShoppingCart>
      {cartQuantity && (
        <Styled.CartQuantity>{cartQuantity}</Styled.CartQuantity>
      )}
    </Styled.Container>
  );
};

export default CartTextButton;
