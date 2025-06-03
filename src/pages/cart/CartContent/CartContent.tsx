import EmptyCartContainer from './EmptyCartContainer/EmptyCartContainer';
import PriceContainer from './PriceContainer/PriceContainer';
import CartList from './CartList/CartList';
import CheckBox from '@/shared/components/CheckBox/CheckBox';
import * as S from './CartContent.styled';
import { useCartItem } from '../hooks/useCartItem';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/shared/config/routes';
import { calculatePaymentAmount } from '@/shared/utils/orderPricing';

export default function CartContent() {
  const {
    cartItems,
    isLoading,
    errorMessage,
    refetchCartItems,
    orderIdList,
    isAllChecked,
    orderTotalPrice,
    toggleAllCheckBox,
    addOrderItemId,
    removeOrderItemId,
  } = useCartItem();
  const navigate = useNavigate();

  if (isLoading) {
    return <div>로딩중</div>;
  }

  if (errorMessage) {
    return <div>에러남</div>;
  }

  if (!cartItems?.length) {
    return <EmptyCartContainer />;
  }

  const handleOrderConfirmButtonClick = () => {
    const orderList = cartItems?.filter((item) => orderIdList.includes(item.id)) ?? [];
    const paymentAmount = calculatePaymentAmount(orderTotalPrice ?? 0);

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
        <CheckBox isChecked={isAllChecked} onClick={toggleAllCheckBox} aria-label="전체 선택" />
        <S.Text>전체 선택</S.Text>
      </S.AllCheckBox>
      <S.ScrollContainer>
        <CartList
          cartItems={cartItems}
          orderIdList={orderIdList}
          refetchCartItems={refetchCartItems}
          addOrderItemId={addOrderItemId}
          removeOrderItemId={removeOrderItemId}
        />
        <PriceContainer orderTotalPrice={orderTotalPrice ?? 0} />
      </S.ScrollContainer>
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
