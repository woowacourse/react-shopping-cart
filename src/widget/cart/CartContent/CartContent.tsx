import EmptyCartContainer from '../EmptyCartContainer/EmptyCartContainer';
import PriceContainer from '../PriceContainer';
import CartList from '@features/cart/ui/CartList/CartList';
import CheckBox from '@/shared/ui/CheckBox';
import * as S from './CartContent.styled';
import LoadingContainer from '@/shared/ui/LoadingContainer/LoadingContainer';
import ErrorContainer from '@/shared/ui/ErrorContainer/ErrorContainer';
import { useCartContext } from '@entities/cart';
import { useOrderSelection, useOrderCalculation } from '@entities/order';
import { usePageNavigation } from '@app/hooks/usePageNavigation';
import BottomConfirmButton from '@/shared/ui/BottomConfirmButton/BottomConfirmButton';

export default function CartContent() {
  const { items: cartItems, isLoading, error: errorMessage } = useCartContext();
  const { orderIdList, isAllChecked, toggleAllSelection, addOrderItemId, removeOrderItemId } =
    useOrderSelection(cartItems);
  const { orderPrice, deliveryFee, orderTotalPrice } = useOrderCalculation(cartItems, orderIdList);

  const { navigateToOrder } = usePageNavigation();

  if (isLoading && !cartItems?.length) {
    return <LoadingContainer />;
  }

  if (errorMessage) {
    return <ErrorContainer errorMessage={errorMessage} />;
  }

  if (!cartItems?.length) {
    return <EmptyCartContainer />;
  }

  const handleOrderConfirmButtonClick = () => {
    const orderItems = cartItems?.filter((item) => orderIdList.includes(item.id)) ?? [];
    navigateToOrder({ orderItems });
  };

  return (
    <S.Container>
      <S.Text>현재 {cartItems.length}종류의 상품이 담겨있습니다.</S.Text>
      <S.AllCheckBox>
        <CheckBox isChecked={isAllChecked} onClick={toggleAllSelection} aria-label="전체 선택" />
        <S.Text>전체 선택</S.Text>
      </S.AllCheckBox>
      <CartList
        cartItems={cartItems}
        orderIdList={orderIdList}
        addOrderItemId={addOrderItemId}
        removeOrderItemId={removeOrderItemId}
      />
      <PriceContainer
        orderPrice={orderPrice}
        deliveryFee={deliveryFee}
        orderTotalPrice={orderTotalPrice}
      />
      <BottomConfirmButton
        buttonText="주문 확인"
        disabled={!orderIdList.length}
        onClick={handleOrderConfirmButtonClick}
      />
    </S.Container>
  );
}
