import {useRecoilValue} from "recoil";
import {cartCheckedSelector, cartCountSelector, cartState, checkedCartCountSelector} from "../../recoil/cartAtoms";
import CartItem from "../CartItem";
import {CartListCheckCounter, CartListController} from "./CartList.style";
import useCart from "../../hooks/useCart.ts";

function CartList() {
  const cartList = useRecoilValue(cartState);
  const checkedCartListCount = useRecoilValue(checkedCartCountSelector);
  const cartCount = useRecoilValue(cartCountSelector);
  const isAllCartItemChecked = useRecoilValue(cartCheckedSelector);
  const {switchAllCheckboxes} = useCart();

  return (
    <div style={{width: '100%'}}>
      {cartList.map((cart) => (
        <CartItem key={cart.id} cart={cart}/>
      ))}
      <CartListController>
        <input
          type='checkbox'
          checked={isAllCartItemChecked}
          onChange={() => switchAllCheckboxes()}
        />
        <CartListCheckCounter>전체선택 ({checkedCartListCount}/{cartCount})</CartListCheckCounter>
        <div>
          <button>선택삭제</button>
        </div>
      </CartListController>
    </div>
  );
}

export default CartList;
