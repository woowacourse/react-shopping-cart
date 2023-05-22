import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  allCartCheckedSelector,
  cartCountSelector,
  cartState,
  checkedCartCountSelector,
  removeCartItemsSelector,
  switchAllCartCheckboxSelector,
} from "../../recoil/cartAtoms";
import CartItem from "../CartItem";
import {
  CartListCheckCounter,
  CartListController,
  CartListWrapper,
  CartsDeleteButton,
} from "./CartList.style";

function CartList() {
  const cartList = useRecoilValue(cartState);
  const checkedCartListCount = useRecoilValue(checkedCartCountSelector);
  const cartCount = useRecoilValue(cartCountSelector);
  const isAllCartItemChecked = useRecoilValue(allCartCheckedSelector);

  const removeCheckedCartItems = useSetRecoilState(removeCartItemsSelector);
  const switchAllCheckboxes = useSetRecoilState(switchAllCartCheckboxSelector);
  return (
    <CartListWrapper>
      {cartList.map((cart) => (
        <CartItem key={cart.id} cart={cart} />
      ))}
      <CartListController>
        <input
          type="checkbox"
          checked={isAllCartItemChecked}
          onChange={() => switchAllCheckboxes(undefined)}
        />
        <CartListCheckCounter onClick={() => switchAllCheckboxes(undefined)}>
          전체선택 ({checkedCartListCount}/{cartCount})
        </CartListCheckCounter>
        <CartsDeleteButton onClick={() => removeCheckedCartItems(undefined)}>
          선택삭제
        </CartsDeleteButton>
      </CartListController>
    </CartListWrapper>
  );
}

export default CartList;
