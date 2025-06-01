import FooterButton from '../../../common/footerButton/FooterButton';
import CartList from '../cartList/CartList';
import CartPrice from '../cartPrice/CartPrice';
import CartTitle from '../cartTitle/CartTitle';
import * as S from './CartContents.styles';
import useCartContents from '../hooks/useCartContents';

function CartContents() {
  const cart = useCartContents();

  if (cart.cartItems.length === 0) {
    return (
      <S.Container>
        <CartTitle />
        <S.EmptyCart>장바구니에 담은 상품이 없습니다.</S.EmptyCart>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <CartTitle quantity={cart.cartItems.length} />
      <CartList
        cartItems={cart.cartItems}
        selectedList={cart.selection.selectedList}
        allSelected={cart.selection.allSelected}
        toggle={cart.selection.toggle}
        toggleAll={cart.selection.toggleAll}
        refetch={cart.fetch}
      />
      <CartPrice value={cart.selection.orderPrice} />
      <FooterButton
        disabled={cart.selection.disabled}
        onClick={cart.moveToOrderConfirm}
      >
        주문 확인
      </FooterButton>
    </S.Container>
  );
}

export default CartContents;
