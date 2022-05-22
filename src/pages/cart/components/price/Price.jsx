import { useSelector } from "react-redux";
import StyledPrice from "@/pages/cart/components/price/Price.styled";

function Price() {
  const cartList = useSelector((state) => state.cartListState);

  const getTotalCount =
    (cartList.length > 0 &&
      cartList.reduce((prev, current) => {
        if (current.checked === true) {
          return prev + current.quantity;
        }
        return prev;
      }, 0)) ||
    0;

  const getTotalPrice =
    (cartList.length > 0 &&
      cartList.reduce((prev, current) => {
        if (current.checked === true) {
          return prev + current.quantity * current.price;
        }
        return prev;
      }, 0)) ||
    0;

  return (
    <StyledPrice>
      <div className="cart-right-section__top">
        <h3>결제예상금액</h3>
      </div>
      <hr />
      <div className="cart-right-section__bottom">
        <div className="cart-right-section__bottom__price">
          <span className="highlight-text">결제예상금액</span>
          <span className="highlight-text">
            {getTotalPrice.toLocaleString("ko-KR")}원
          </span>
        </div>
        <div className="cart-right-section__bottom__button">
          <button type="button">주문하기({getTotalCount}개)</button>
        </div>
      </div>
    </StyledPrice>
  );
}

export default Price;
