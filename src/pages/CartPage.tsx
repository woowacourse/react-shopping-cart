import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import CartTitle from "../components/CartPage/CartTitle";
import CartItems from "../components/CartPage/CartItems";
import OrderSummary from "../components/CartPage/OrderSummary";
import EmptyCart from "../components/CartPage/EmptyCart";
import CartLayout from "../components/layout";

import { cartItemListAtom, isVacantCartSelector } from "../recoil/cart/cartItemState";
import { checkedIdSetSelector } from "../recoil/cart/checkedState";

const CartPage = () => {
  const navigate = useNavigate();
  const isCartVacant = useRecoilValue(isVacantCartSelector);
  const cartItemCheckedIds = useRecoilValue(checkedIdSetSelector);
  const cartItemList = useRecoilValue(cartItemListAtom);
  const handleClick = () => {
    navigate("/orderConfirmation");
  };

  return (
    <>
      <CartLayout>
        <CartLayout.Header>SHOP</CartLayout.Header>
        <CartLayout.Content>
          <CartTitle mainText={`장바구니`} subText={`현재 ${cartItemList.length}종류의 상품이 담겨있습니다.`} />
          {!isCartVacant ? (
            <>
              <CartItems />

              <OrderSummary />
            </>
          ) : (
            <EmptyCart />
          )}
        </CartLayout.Content>
        <CartLayout.Footer text="주문 확인" isActive={cartItemCheckedIds.size > 0} onClick={handleClick} />
      </CartLayout>
    </>
  );
};

export default CartPage;
