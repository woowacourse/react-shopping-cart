import FooterButton from '../../../common/footerButton/FooterButton';
import CartList from '../cartList/CartList';
import CartPrice from '../cartPrice/CartPrice';
import CartTitle from '../cartTitle/CartTitle';
import { useCartContext } from '../../../../global/contexts/CartContext';
import { useCartSelectionContext } from '../../../../global/contexts/CartSelectionContext';
import * as S from './CartContents.styles';
import { useNavigate } from 'react-router';

function CartContents() {
  const { cartItems } = useCartContext();
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
      <CartList />
      <CartPrice value={selection.orderPrice} />
      <FooterButton disabled={selection.disabled} onClick={moveToOrderConfirm}>
        주문 확인
      </FooterButton>
    </S.Container>
  );
}

export default CartContents;
