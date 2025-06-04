import CartItem from "./CartItem";

type CartItemCheck = CartItem & {
  isClicked: boolean;
};

export default CartItemCheck;
