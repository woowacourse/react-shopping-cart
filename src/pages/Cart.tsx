import Header from "components/Header";
import Page from "components/common/Page";
import CartItemList from "components/CartItemList";
import PurchaseOrder from "components/PurchaseOrder";

const Cart = () => {
  return (
    <>
      <Header />
      <Page>
        <CartItemList />
        <PurchaseOrder />
      </Page>
    </>
  );
};

export default Cart;
