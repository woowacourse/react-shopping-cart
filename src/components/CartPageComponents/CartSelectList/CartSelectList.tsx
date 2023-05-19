import * as Styled from './CartSelectList.styles.tsx';
import CartItem from './CartItem/CartItem.tsx';

const CartSelectList = () => {
  return (
    <Styled.CartSelectListWrapper>
      <Styled.CartQuantityText>배송 상품 (3)개</Styled.CartQuantityText>
      <hr />
      <div>
        <div>
          <CartItem />
          <CartItem />

          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />

          <span>전체선택 (2/3)</span>
          <button>선택삭제</button>
        </div>
      </div>
    </Styled.CartSelectListWrapper>
  );
};
export default CartSelectList;
