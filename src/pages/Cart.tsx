import Header from "components/Header";
import Page from "components/common/Page";
import CartItemList from "components/CartItemList";

const Cart = () => {
  return (
    <>
      <Header />
      <Page>
        <CartItemList />
      </Page>
    </>
  );
};

export default Cart;
