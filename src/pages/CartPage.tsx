import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { cartItemCheckedIdsAtom, cartItemsAtom } from "../recoil/atom/atom";
import { CartLayout, Header, Content, Footer } from "../components/layout";
import { CartItems, EmptyCart, OrderSummary } from "../components/cartPage";
import { Title } from "../components/default";
import { useEffect } from "react";

const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useRecoilState(cartItemsAtom);
  const cartItemCheckedIds = useRecoilValue(cartItemCheckedIdsAtom);

  const handleClick = () => {
    navigate("/orderConfirmation");
  };

  return (
    <CartLayout>
      <Header>SHOP</Header>
      <Content>
        <Title
          title="장바구니"
          description={`현재 ${cartItems.length}종류의 상품이 담겨있습니다.`}
          showDescription={cartItems.length > 0}
        />

        {cartItems.length > 0 ? (
          <>
            <CartItems />
            <OrderSummary />
          </>
        ) : (
          <EmptyCart />
        )}
      </Content>
      <Footer
        text="주문 확인"
        isActive={cartItemCheckedIds.length > 0}
        onClick={handleClick}
      />
    </CartLayout>
  );
};

export default CartPage;
