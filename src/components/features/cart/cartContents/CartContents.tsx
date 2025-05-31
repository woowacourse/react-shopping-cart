import { ErrorToastMessage, FooterButton } from '@/components/common';
import { useNavigate } from 'react-router';
import CartList from '../cartList/CartList';
import CartPrice from '../cartPrice/CartPrice';
import CartTitle from '../cartTitle/CartTitle';
import useCartSelection from '../hooks/useCartSelection';
import { CartItemType } from '../types';
import { calculateOrderPrice } from '../utils/cartCalculations';
import * as S from './CartContents.styles';
import CartEmptyContent from './CartEmptyContent';

function CartContents({
  resource,
  refetch,
}: {
  resource: { read: () => CartItemType[] };
  refetch: () => void;
}) {
  const cartItems = resource.read();
  const cartSelection = useCartSelection(cartItems);
  const navigate = useNavigate();

  const selectCartItems = cartSelection.utils.getSelectedItems(cartItems);
  const orderPrice = calculateOrderPrice(selectCartItems);

  const disabled = !cartSelection.states.isSomeItemSelected;

  const onOrderConfirm = () => {
    navigate('/order-confirmation', {
      state: { orderProducts: selectCartItems },
    });
  };

  if (cartItems.length === 0) {
    return <CartEmptyContent />;
  }

  return (
    <S.Container>
      <CartTitle cartItemsQuantity={cartItems.length} />
      <CartList
        cartItems={cartItems}
        selectedCartItemIds={cartSelection.states.selectedItemIds}
        isAllItemSelected={cartSelection.states.isAllItemSelected}
        toggleSelect={cartSelection.actions.toggle}
        toggleAllSelect={cartSelection.actions.toggleAll}
        refetch={refetch}
      />
      <CartPrice orderPrice={orderPrice} />
      <FooterButton disabled={disabled} onClick={onOrderConfirm}>
        주문 확인
      </FooterButton>
      <ErrorToastMessage />
    </S.Container>
  );
}

export default CartContents;
