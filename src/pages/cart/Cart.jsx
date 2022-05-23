import styles from "@cart/cart.module";
import PageTitle from "@shared/page-title/PageTitle";
import CartForm from "./components/cart-form/CartForm";
import CartTotal from "./components/cart-total/CartTotal";

const cn = require("classnames");

function Cart() {
  return (
    <div className="wrapper">
      <div className={cn(styles.cart)}>
        <PageTitle className="mb-50">장바구니</PageTitle>
        <div className="relative flex space-between">
          <CartForm className="w-full pr-100" />
          <CartTotal className="sticky top-100 min-w-400 place-self-start" />
        </div>
      </div>
    </div>
  );
}

export default Cart;
