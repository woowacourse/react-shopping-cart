import FooterButton from '../../../common/footerButton/FooterButton';
import CartList from '../cartList/CartList';
import CartPrice from '../cartPrice/CartPrice';
import CartTitle from '../cartTitle/CartTitle';
import { useCartContext } from '../contexts/CartContext';
import { useCartSelectionContext } from '../contexts/CartSelectionContext';
import * as S from './CartContents.styles';
import { useNavigate } from 'react-router';

function CartContents() {
  const { cartItems, fetch } = useCartContext();
  const selection = useCartSelectionContext();
  const navigate = useNavigate();

  const moveToOrderConfirm = () => {
    navigate('/order-confirmation', {
      state: { orderProducts: selection.selectCartItems },
    });
  };

  if (cartItems.length === 0) {
    return (
      <S.Container>
        <CartTitle />
        <S.EmptyCart>장바구니에 담은 상품이 없습니다.</S.EmptyCart>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <CartTitle quantity={cartItems.length} />
      <CartList
        cartItems={cartItems}
        selectedList={selection.selectedList}
        allSelected={selection.allSelected}
        toggle={selection.toggle}
        toggleAll={selection.toggleAll}
        refetch={fetch}
      />
      <CartPrice value={selection.orderPrice} />
      <FooterButton disabled={selection.disabled} onClick={moveToOrderConfirm}>
        주문 확인
      </FooterButton>
    </S.Container>
  );
}

export default CartContents;
