import StyledPrice from "@/pages/cart/components/price/Price.styled";

function Price() {
  return (
    <StyledPrice>
      <div className="cart-right-section__top">
        <h3>결제예상금액</h3>
      </div>
      <hr />
      <div className="cart-right-section__bottom">
        <div className="cart-right-section__bottom__price">
          <span className="highlight-text">결제예상금액</span>
          <span className="highlight-text">21,800원</span>
        </div>
        <div className="cart-right-section__bottom__button">
          <button type="button">주문하기(3개)</button>
        </div>
      </div>
    </StyledPrice>
  );
}

export default Price;
