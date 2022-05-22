import CartItem from '@/components/cart/CartItem/CartItem';
import * as Styled from './CartList.style';
function CartList({ cartList }) {
  return (
    <Styled.Container>
      <Styled.Amount>배송 상품 ({cartList.length}개)</Styled.Amount>
      {cartList.map(cart => (
        <CartItem key={cart.id} cart={cart} />
      ))}
    </Styled.Container>
  );
}

export default CartList;
