import CartItem from '@/components/cart/CartItem/CartItem';
import * as Styled from './CartList.style';
function CartList({
  cartList,
  checkCartItemLoading,
  checkCartItemChecked,
  decreaseCartItemCount,
  increaseCartItemCount,
  deleteCartItem,
  checkCartItem,
}) {
  return (
    <Styled.Container>
      <Styled.Amount>배송 상품 ({cartList.length}개)</Styled.Amount>
      {cartList.map(cart => (
        <CartItem
          key={cart.id}
          cart={cart}
          isLoading={checkCartItemLoading(cart.id)}
          isChecked={checkCartItemChecked(cart.id)}
          onClickDecreaseButton={() => decreaseCartItemCount(cart)}
          onClickIncreaseButton={() => increaseCartItemCount(cart)}
          onClickDeleteButton={() => deleteCartItem(cart)}
          onClickCheckBox={() => checkCartItem(cart)}
        />
      ))}
    </Styled.Container>
  );
}

export default CartList;
