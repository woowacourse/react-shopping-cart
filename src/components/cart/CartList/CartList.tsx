import CartItem from '@/components/cart/CartItem/CartItem';
import Button from '@/components/common/Button/Button';
import CheckBox from '@/components/common/CheckBox/CheckBox';
import theme from '@/styles/Theme';
import * as Styled from './CartList.style';
function CartList({
  cartList,
  checkCartItemLoading,
  checkCartItemChecked,
  checkEveryCartItemChecked,
  decreaseCartItemCount,
  increaseCartItemCount,
  deleteCartItem,
  deleteEveryCartItem,
  selectCartItem,
  selectEveryCartItem,
}) {
  const onClickCheckBox = () => {
    selectEveryCartItem();
  };

  const onClickDeleteAllButton = () => {
    deleteEveryCartItem();
  };

  return (
    <Styled.Container>
      <Styled.SelectWrapper>
        <CheckBox isChecked={checkEveryCartItemChecked()} onClick={onClickCheckBox} />
        <Button
          backgroundColor={theme.brandColor_1}
          fontColor={theme.whiteColor_1}
          padding="10px"
          onClick={onClickDeleteAllButton}
        >
          전체삭제
        </Button>
      </Styled.SelectWrapper>
      <Styled.Amount>배송 상품 ({cartList.length}개)</Styled.Amount>
      {cartList.map(cart => (
        <CartItem
          key={cart.id}
          cart={cart}
          isLoading={checkCartItemLoading(cart.id)}
          isChecked={checkCartItemChecked(cart.id)}
          onClickDecreaseButton={() => decreaseCartItemCount(cart)}
          onClickIncreaseButton={() => increaseCartItemCount(cart)}
          onClickDeleteButton={() => deleteCartItem(cart)}
          onClickCheckBox={() => selectCartItem(cart)}
        />
      ))}
    </Styled.Container>
  );
}

export default CartList;
