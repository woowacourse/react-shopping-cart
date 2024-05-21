import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { checkedIdListAtom, cartItemsAtom } from "../recoil/atom/atom";
import CartTitle from "../components/CartPage/CartTitle";
import CartItems from "../components/CartPage/CartItems";
import OrderSummary from "../components/CartPage/OrderSummary";
import EmptyCart from "../components/CartPage/EmptyCart";
import { CartLayout, Header, Content, Footer } from "../components/layout";
import { isVacantSelector } from "../recoil/selector/selector";

const CartPage = () => {
  const navigate = useNavigate();
  const cartItems = useRecoilValue(cartItemsAtom);
  const isCartVacant = useRecoilValue(isVacantSelector);
  const cartItemCheckedIds = useRecoilValue(checkedIdListAtom);

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
      <Footer text="주문 확인" isActive={cartItemCheckedIds.length > 0} onClick={handleClick} />
    </CartLayout>
  );
};

export default CartPage;
