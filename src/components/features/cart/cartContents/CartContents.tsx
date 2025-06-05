import { ErrorToastMessage, FooterButton } from '@/components/common';
import { useNavigate } from 'react-router';
import CartList from '../cartList/CartList';
import CartPriceSummary from '../cartPriceSummary/CartPriceSummary';
import CartTitle from '../cartTitle/CartTitle';
import useCartSelection from '../hooks/useCartSelection';
import { CartItemType } from '../types';
import { calculateOrderPrice } from '../utils/cartCalculations';
import * as S from './CartContents.styles';
import CartEmptyContent from './CartEmptyContent';

function CartContents({ cartItems }: { cartItems: CartItemType[] }) {
  const cartSelection = useCartSelection(cartItems);
  const navigate = useNavigate();

  const selectCartItems = cartSelection.utils.getSelectedItems(cartItems);
  const orderPrice = calculateOrderPrice(selectCartItems);

  const disabled = !cartSelection.states.isSomeItemSelected;

  const moveToOrderCheck = () => {
    navigate('/order-check', {
      state: { orderProducts: selectCartItems },
    });
  };

  if (cartItems.length === 0) {
    return <CartEmptyContent />;
  }

  return (
    <S.Container>
      <CartTitle quantity={cartItems.length} />
      <CartList
        cartItems={cartItems}
        selectedCartItemIds={cartSelection.states.selectedItemIds}
        isAllItemSelected={cartSelection.states.isAllItemSelected}
        toggleSelect={cartSelection.actions.toggle}
        toggleAllSelect={cartSelection.actions.toggleAll}
      />
      <CartPriceSummary value={orderPrice} />
      <FooterButton disabled={disabled} onClick={moveToOrderCheck}>
        주문 확인
      </FooterButton>
      <ErrorToastMessage />
    </S.Container>
  );
}

export default CartContents;
