import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import CartTitle from "../components/CartPage/CartTitle";
import CartItems from "../components/CartPage/CartItems";
import OrderSummary from "../components/CartPage/OrderSummary";
import EmptyCart from "../components/CartPage/EmptyCart";
import { CartLayout, Header, Content, Footer } from "../components/layout";

import { cartItemListAtom, isVacantCartSelector } from "../recoil/cartItemState";
import { checkedIdSetSelector } from "../recoil/checkedState";
import { addCartItem } from "../api/cartItem";

const CartPage = () => {
  const navigate = useNavigate();
  const isCartVacant = useRecoilValue(isVacantCartSelector);
  const cartItemCheckedIds = useRecoilValue(checkedIdSetSelector);
  // addCartItem(2);

  const handleClick = () => {
    navigate("/orderConfirmation");
  };

  return (
    <CartLayout>
      <Header>SHOP</Header>
      <Content>
        <CartTitle />
        {!isCartVacant ? (
          <>
            <CartItems />
            <OrderSummary />
          </>
        ) : (
          <EmptyCart />
        )}
      </Content>
      <Footer text="주문 확인" isActive={cartItemCheckedIds.size > 0} onClick={handleClick} />
    </CartLayout>
  );
};

export default CartPage;
