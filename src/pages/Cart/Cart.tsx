import CartItemList from "../../components/CartItemList/CartItemList";
import CheckBox from "../../components/CheckBox/CheckBox";
import Description from "../../components/Description/Description";
import Header from "../../components/Header/Header";
import Receipt from "../../components/Receipt/Receipt";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import { Container, NoCartItemText } from "./Cart.styles";

function Cart() {
  const cartItemCount = 5;
  return (
    <>
      <Header icon="/public/logo.svg" handleIconClick={() => alert("클릭")} />
      <section css={Container}>
        <Description cartItemCount={cartItemCount} />

        {cartItemCount === 0 ? (
          <p css={NoCartItemText}>장바구니에 담은 상품이 없습니다.</p>
        ) : (
          <div>
            <CheckBox id="234" label="전체선택" isSelected={true} />
            <CartItemList />
            <Receipt />
          </div>
        )}
      </section>
      <SubmitButton label="주문 확인" enabled={true} />
    </>
  );
}

export default Cart;
