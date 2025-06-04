import EmptyCartContainer from './EmptyCartContainer/EmptyCartContainer';
import PriceContainer from './PriceContainer/PriceContainer';
import CartList from './CartList/CartList';
import CheckBox from '@/shared/components/CheckBox/CheckBox';
import * as S from './CartContent.styled';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/shared/config/routes';
import LoadingContainer from '@/shared/components/LoadingContainer/LoadingContainer';
import ErrorContainer from '@/shared/components/ErrorContainer/ErrorContainer';
import { useCartContext } from '../contexts/CartContext';
import { useOrderSelection } from '../hooks/useOrderSelection';
import { useOrderCalculation } from '../hooks/useOrderCalculation';

export default function CartContent() {
  const { cartItems, isLoading, errorMessage } = useCartContext();
  const { orderIdList, isAllChecked, toggleAllSelection, addOrderItemId, removeOrderItemId } =
    useOrderSelection(cartItems);
  const { orderTotalPrice, deliveryFee, paymentAmount } = useOrderCalculation(
    cartItems,
    orderIdList,
  );

  const navigate = useNavigate();

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
    const orderList = cartItems?.filter((item) => orderIdList.includes(item.id)) ?? [];

    navigate(ROUTES.ORDER_SUCCESS, {
      state: {
        orderList,
        paymentAmount,
      },
    });
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
        orderTotalPrice={orderTotalPrice}
        deliveryFee={deliveryFee}
        paymentAmount={paymentAmount}
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
