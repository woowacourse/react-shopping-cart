import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { cartItemCheckedIdsAtom, cartItemsAtom } from "../recoil/atom/atom";
import { fetchCartItems } from "../api/cartItem";
import CartTitle from "../components/CartPage/CartTitle";
import CartItems from "../components/CartPage/CartItems";
import OrderSummary from "../components/CartPage/OrderSummary";
import EmptyCart from "../components/CartPage/EmptyCart";
import { CartLayout, Header, Content, Footer } from "../components/layout";
import { fetchCartItemsSelector } from "../recoil/selector/selector";

const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItmes] = useRecoilState(cartItemsAtom);
  const cartItemCheckedIds = useRecoilValue(cartItemCheckedIdsAtom);
  const fetchCartItemsValue = useRecoilValue(fetchCartItemsSelector);

  setCartItmes(fetchCartItemsValue);

  const handleClick = () => {
    navigate("/orderConfirmation");
  };

  return (
    <CartLayout>
      <Header>SHOP</Header>
      <Content>
        <CartTitle />
        {cartItems.length > 0 ? (
          <>
            <CartItems />
            <OrderSummary />
          </>
        ) : (
          <EmptyCart />
        )}
      </Content>
      <Footer text="주문 확인" isActive={cartItemCheckedIds.length > 0} onClick={handleClick} />
    </CartLayout>
  );
};

export default CartPage;
