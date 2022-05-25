import cn from "classnames";
import PageTitle from "@shared/page-title/PageTitle";
import styles from "@cart/cart.module";
import CartForm from "./components/cart-form/CartForm";
import CartTotal from "./components/cart-total/CartTotal";

function Cart() {
  return (
    <div className="wrapper">
      <div className={cn(styles.cart)}>
        <PageTitle className="mb-50">장바구니</PageTitle>
        <div className={styles.container}>
          <CartForm className={styles.cartForm} />
          <CartTotal className={styles.cartTotal} />
        </div>
      </div>
    </div>
  );
}

export default Cart;
