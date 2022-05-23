import styles from "@cart/cart.module";
import PageTitle from "@shared/page-title/PageTitle";

const cn = require("classnames");

function Cart() {
  return (
    <div className="wrapper">
      <div className={cn(styles.cart)}>
        <PageTitle>장바구니</PageTitle>
      </div>
    </div>
  );
}

export default Cart;
