import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { fetchCartItems } from "../api/cartItem";
import { cartItemCheckedIdsAtom, cartItemsAtom } from "../recoil/atom";
import { css } from "@emotion/css";
import CartTitle from "../components/CartPage/CartTitle";
import CartItems from "../components/CartPage/CartItems";
import OrderSummary from "../components/CartPage/OrderSummary";
import EmptyCart from "../components/CartPage/EmptyCart";
import { useNavigate } from "react-router-dom";
import CartLayout from "./CartLayout";

const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItmes] = useRecoilState(cartItemsAtom);
  const cartItemCheckedIds = useRecoilValue(cartItemCheckedIdsAtom);

  useEffect(() => {
    // addCartItem(11);
    const loadCartItems = async () => {
      const data = await fetchCartItems();
      setCartItmes(data);
    };
    loadCartItems();
  }, []);

  const handleClick = () => {
    if (cartItemCheckedIds.length > 0) {
      navigate("/orderConfirmation");
    }
  };

  return (
    <div className={cartPageCSS}>
      <header className={headerCSS}>SHOP</header>
      <section className={contentCSS}>
        <CartTitle />
        {cartItems.length > 0 ? (
          <>
            <CartItems />
            <OrderSummary />
          </>
        ) : (
          <EmptyCart />
        )}
      </section>
      <footer className={orderConfirmCSS(cartItemCheckedIds.length > 0)} onClick={handleClick}>
        주문 확인
      </footer>
    </div>
  );
};

export default CartPage;

const cartPageCSS = css`
  display: flex;
  flex-direction: column;
  gap: 36px;
  height: 100vh;
  width: 429px;
  position: relative;
  padding: 0 24px;
  margin: 0 auto;
  box-sizing: border-box;
`;

const headerCSS = css`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  width: 429px;
  height: 64px;
  padding: 0 24px;
  background: #000000;

  color: #ffffff;
  font-family: Noto Sans;
  font-size: 20px;
  font-weight: 800;
`;

const contentCSS = css`
  margin: 64px 0;
  padding: 36px 0;
  height: calc(100vh - 138px);
  display: flex;

  flex-direction: column;
  gap: 36px;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const orderConfirmCSS = (clickable: boolean) => css`
  padding: 24px 65px;
  gap: 10px;

  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: 429px;
  height: 64px;
  padding: 0 24px;
  background: ${clickable ? "#000000" : "#BEBEBE"};
  cursor: pointer;

  color: #ffffff;
  font-family: Noto Sans;
  font-size: 16px;
  font-weight: 700;
`;
