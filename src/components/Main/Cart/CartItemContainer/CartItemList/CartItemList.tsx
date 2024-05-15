import { useRecoilValue } from "recoil";
import CartItem from "./CartItem/CartItem";
import { cartState } from "../../../../../store/selector/selectors";

const CartItemList = () => {
  const cartItems = useRecoilValue<CartItemInfo[]>(cartState);

  return (
    <div>
      {cartItems.map((item) => (
        <CartItem CartItemInfo={item} key={item.id} />
      ))}
    </div>
  );
};

export default CartItemList;
