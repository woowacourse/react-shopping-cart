import { useRecoilValue } from "recoil";
import useCart from "../../hooks/useCart";
import { cartCountSelector } from "../../recoil/cartAtoms";
import CartItem from "../CartItem";
import { CartListCheckCounter, CartListController, CartListTitle } from "./CartList.style";

function CartList() {
  const { cartList } = useCart();
  const cartCount = useRecoilValue(cartCountSelector);

  return (
    <div style={{ width: '100%' }}>
      <CartListTitle>든든배송 상품 ({cartCount}개)</CartListTitle>
      {cartList.map((cart) => (
        <CartItem key={cart.id} cart={cart} />
      ))}
      <CartListController>
        <input type='checkbox' />
        <CartListCheckCounter>전체선택 (2/{cartCount})</CartListCheckCounter>
        <div><button>선택삭제</button></div>
      </CartListController>
    </div>
  );
}

export default CartList;
