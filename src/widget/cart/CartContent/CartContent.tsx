import EmptyCartContainer from '../EmptyCartContainer/EmptyCartContainer';
import PriceContainer from '../PriceContainer/PriceContainer';
import CartList from '@/features/cart/ui/CartList/CartList';
import CheckBox from '@shared/components/CheckBox/CheckBox';
import * as S from './CartContent.styled';
import LoadingContainer from '@shared/components/LoadingContainer/LoadingContainer';
import ErrorContainer from '@shared/components/ErrorContainer/ErrorContainer';
import { useCartContext } from '@features/cart/model/provider/CartProvider';
import { useOrderSelection } from '@features/cart/model/useOrderSelection';
import { useOrderCalculation } from '@features/cart/model/useOrderCalculation';
import { usePageNavigation } from '@shared/hooks/usePageNavigation';

export default function CartContent() {
  const { cartItems, isLoading, errorMessage } = useCartContext();
  const { orderIdList, isAllChecked, toggleAllSelection, addOrderItemId, removeOrderItemId } =
    useOrderSelection(cartItems);
  const { orderPrice, deliveryFee, orderTotalPrice } = useOrderCalculation(cartItems, orderIdList);

  const { navigateToOrderSuccess } = usePageNavigation();

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
    navigateToOrderSuccess({ orderItems, orderTotalPrice });
  };

  return (
    <S.Container>
      <S.Text>현재 {cartItems.length}종류의 상품이 담겨있습니다.</S.Text>
      <S.AllCheckBox>
        <CheckBox isChecked={isAllChecked} onClick={toggleAllSelection} aria-label="전체 선택" />
        <S.Text>전체 선택</S.Text>
      </S.AllCheckBox>
      <S.ScrollContainer>
        <CartList
          cartItems={cartItems}
          orderIdList={orderIdList}
          addOrderItemId={addOrderItemId}
          removeOrderItemId={removeOrderItemId}
        />
      </S.ScrollContainer>
      <PriceContainer
        orderPrice={orderPrice}
        deliveryFee={deliveryFee}
        orderTotalPrice={orderTotalPrice}
      />
      <S.OrderConfirmButton
        disabled={!orderIdList.length}
        type="button"
        onClick={handleOrderConfirmButtonClick}
      >
        주문 확인
      </S.OrderConfirmButton>
    </S.Container>
  );
}
