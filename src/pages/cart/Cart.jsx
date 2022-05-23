import styles from "@cart/cart.module";
import PageTitle from "@shared/page-title/PageTitle";
import { useSelector } from "react-redux";
import productObjsEquality from "@redux/equalities/productObjsEquality";
import Alert from "@shared/alert/Alert";
import CartForm from "./components/cart-form/CartForm";
import CartTotal from "./components/cart-total/CartTotal";

const cn = require("classnames");

function Cart() {
  const productObjs = useSelector(
    (state) => state.productObjs,
    productObjsEquality
  );
  const isEmptyProductObjs = Object.keys(productObjs).length === 0;
  return (
    <div className="wrapper">
      <div className={cn(styles.cart)}>
        <PageTitle>장바구니</PageTitle>
        {isEmptyProductObjs ? (
          <Alert variant="danger" className="mt-30">
            상품 목록이 비어있습니다
          </Alert>
        ) : (
          <div className="flex space-between">
            <CartForm />
            <CartTotal />
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
