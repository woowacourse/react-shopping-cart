import CartItemList from "../../components/CartItemList/CartItemList";
import CheckBox from "../../components/CheckBox/CheckBox";
import Description from "../../components/Description/Description";
import Header from "../../components/Header/Header";
import Receipt from "../../components/Receipt/Receipt";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import { Container } from "./Cart.styles";

function Cart() {
  return (
    <>
      <Header icon="/public/logo.svg" handleIconClick={() => alert("클릭")} />
      <section css={Container}>
        <Description cartItemCount={2} />
        <CheckBox id="234" label="전체선택" />
        <CartItemList />
        <Receipt />
      </section>
      <SubmitButton label="주문 확인" enabled={true} />
    </>
  );
}

export default Cart;
