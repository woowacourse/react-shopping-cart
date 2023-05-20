import { useRecoilValue } from "recoil";
import { cartCountSelector, cartState } from "../../recoil/cartAtoms";
import CartItem from "../CartItem";
import { CartListCheckCounter, CartListController } from "./CartList.style";

function CartList() {
  const cartList = useRecoilValue(cartState);
  const cartCount = useRecoilValue(cartCountSelector);

  return (
    <div style={{ width: '100%' }}>
      {cartList.map((cart) => (
        <CartItem key={cart.id} cart={cart} />
      ))}
      <CartListController>
        <input type='checkbox' />
        <CartListCheckCounter>전체선택 (2/{cartCount})</CartListCheckCounter>
        <div>
          <button>선택삭제</button>
        </div>
      </CartListController>
    </div>
  );
}

export default CartList;
