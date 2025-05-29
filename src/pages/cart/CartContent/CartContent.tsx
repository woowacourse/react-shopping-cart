import EmptyCartContainer from './EmptyCartContainer/EmptyCartContainer';
import PriceContainer from './PriceContainer/PriceContainer';
import CartList from './CartList/CartList';
import CheckBox from '@/shared/components/CheckBox/CheckBox';
import * as S from './CartContent.styled';
import { useCartItem } from '../hooks/useCartItem';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/shared/config/routes';

export default function CartContent() {
  const {
    cartItems,
    isLoading,
    errorMessage,
    refetchCartItems,
    orderList,
    isAllChecked,
    orderTotalPrice,
    toggleAllCheckBox,
    addOrderItem,
    removeOrderItem,
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
    navigate(ROUTES.ORDER_SUCCESS, {
      state: {
        orderList,
        orderTotalPrice,
      },
    });
  };

  return (
    <S.Container>
      <S.Text>현재 {cartItems.length}종류의 상품이 담겨있습니다.</S.Text>
      <S.AllCheckBox>
        <CheckBox isChecked={isAllChecked} onClick={toggleAllCheckBox} />
        <S.Text>전체 선택</S.Text>
      </S.AllCheckBox>
      <S.ScrollContainer>
        <CartList
          cartItems={cartItems}
          orderList={orderList}
          refetchCartItems={refetchCartItems}
          addOrderItem={addOrderItem}
          removeOrderItem={removeOrderItem}
        />
        <PriceContainer orderTotalPrice={orderTotalPrice} />
      </S.ScrollContainer>
      <S.OrderConfirmButton
        disabled={!orderList.length}
        type="button"
        onClick={handleOrderConfirmButtonClick}
      >
        주문 확인
      </S.OrderConfirmButton>
    </S.Container>
  );
}
