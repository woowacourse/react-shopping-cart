import FooterButton from '../../../common/footerButton/FooterButton';
import CartList from '../cartList/CartList';
import CartPrice from '../cartPrice/CartPrice';
import CartTitle from '../cartTitle/CartTitle';
import * as S from './CartContents.styles';
import useCartContents from '../hooks/useCartContents';

function CartContents() {
  const {
    cartItems,
    isSelectedList,
    isAllSelected,
    toggleSelect,
    toggleAllSelect,
    fetch,
    orderPrice,
    disabled,
    moveToOrderConfirm,
  } = useCartContents();

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
        isSelectedList={isSelectedList}
        isAllSelected={isAllSelected}
        toggleSelect={toggleSelect}
        toggleAllSelect={toggleAllSelect}
        refetch={fetch}
      />
      <CartPrice value={orderPrice} />
      <FooterButton disabled={disabled} onClick={moveToOrderConfirm}>
        주문 확인
      </FooterButton>
    </S.Container>
  );
}

export default CartContents;
