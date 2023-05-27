import { useRecoilCallback, useRecoilValue } from "recoil";
import {
  allCartCheckedSelector,
  cartCountSelector,
  cartState,
  checkedCartCountSelector,
  checkedCartSelector,
} from "../../recoil/cartAtoms";
import CartItem from "../CartItem";
import {
  CartListCheckCounter,
  CartListController,
  CartListWrapper,
  CartsDeleteButton,
} from "./CartList.style";
import { ReceivedCartItem } from "../../types/types.ts";
import { fetchDeleteCart } from "../../api/api.ts";

function CartList() {
  const cartList = useRecoilValue(cartState);
  const checkedCartListCount = useRecoilValue(checkedCartCountSelector);
  const cartCount = useRecoilValue(cartCountSelector);
  const isAllCartItemChecked = useRecoilValue(allCartCheckedSelector);

  const removeCheckedCartItems = useRecoilCallback(
    ({ snapshot, set }) =>
      async () => {
        const cartList = await snapshot.getPromise(cartState);
        const checkedCartList = await snapshot.getPromise(checkedCartSelector);
        if (confirm("정말로 삭제하시겠습니까?")) {
          const targetIds = checkedCartList.map((cartList) => cartList.id);
          const removedCartList = cartList.filter(
            (cart) => !targetIds.includes(cart.id)
          );
          set(cartState, removedCartList);
          targetIds.forEach((id) => {
            fetchDeleteCart(id);
          });
        }
      },
    []
  );

  const switchAllCheckboxes = useRecoilCallback(
    ({ snapshot, set }) =>
      async () => {
        const cartList = await snapshot.getPromise(cartState);
        const isAllCartItemChecked = await snapshot.getPromise(
          allCartCheckedSelector
        );
        const newCartList = cartList.map((cartItem: ReceivedCartItem) => ({
          ...cartItem,
          checked: !isAllCartItemChecked,
        }));
        set(cartState, newCartList);
      },
    []
  );

  return (
    <CartListWrapper>
      {cartList.map((cart) => (
        <CartItem key={cart.id} cart={cart} />
      ))}
      <CartListController>
        <input
          type="checkbox"
          checked={isAllCartItemChecked}
          onChange={() => switchAllCheckboxes()}
        />
        <CartListCheckCounter onClick={() => switchAllCheckboxes()}>
          전체선택 ({checkedCartListCount}/{cartCount})
        </CartListCheckCounter>
        <CartsDeleteButton onClick={() => removeCheckedCartItems()}>
          선택삭제
        </CartsDeleteButton>
      </CartListController>
    </CartListWrapper>
  );
}

export default CartList;
