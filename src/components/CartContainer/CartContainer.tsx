import useCart from "../../hooks/useCart";
import AllSelector from "../AllSelector/AlllSelector";
import CartItem from "../CartItem/CartItem";
import * as S from "./CartContainer.styles";

const CartContainer = () => {
  const { cartItemsData } = useCart();

  return (
    <S.CartContainer>
      <AllSelector />
      <S.CartItemsContainer>
        {cartItemsData.map((cartItem) => (
          <CartItem key={cartItem.id} cartItem={cartItem} />
        ))}
      </S.CartItemsContainer>
    </S.CartContainer>
  );
};

export default CartContainer;
