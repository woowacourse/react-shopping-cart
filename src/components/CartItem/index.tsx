import { useDispatch } from "react-redux";

import { actionCreators as cartActions, CartItem as CartItemType } from "redux/modules/cart";

import * as S from "./styles";

import deleteIcon from "assets/deleteIcon_gray.png";

import { CART_AMOUNT_MIN, MESSAGE } from "constants/constants";

interface CartItemProps {
  cartItem: CartItemType;
}

function CartItem({ cartItem }: CartItemProps) {
  const dispatch = useDispatch();
  const { id, name, img, price } = cartItem.detail;

  const onClickDeleteItem = () => {
    if (confirm(MESSAGE.CONFIRM_DELETE)) {
      dispatch(cartActions.deleteItem(id));
    }
  };

  const onClickIncreaseCounter = () => {
    dispatch(cartActions.increment(id));
  };

  const onClickDecreaseCounter = () => {
    if (cartItem.amount > CART_AMOUNT_MIN) dispatch(cartActions.decrement(id));
  };

  return (
    <S.CartItemWrapper>
      <input
        type="checkbox"
        checked={cartItem.isSelected}
        onClick={(e) => {
          const targetInput = e.target as HTMLInputElement;
          dispatch(cartActions.toggleItemSelected(cartItem.detail.id, targetInput.checked));
        }}
      />
      <S.CartItemImage src={img} alt={name} />
      <S.CartItemName>{name}</S.CartItemName>
      <S.CartItemInfoWrapper>
        <S.DeleteIcon src={deleteIcon} alt="장바구니 삭제" onClick={onClickDeleteItem} />
        <S.CartCounter>
          <S.CartCounterNumber>{cartItem.amount}</S.CartCounterNumber>
          <S.CartCounterIncreaseButton onClick={onClickIncreaseCounter}>
            ▲
          </S.CartCounterIncreaseButton>
          <S.CartCounterDecreaseButton onClick={onClickDecreaseCounter}>
            ▼
          </S.CartCounterDecreaseButton>
        </S.CartCounter>
        <div>{price.toLocaleString()}원</div>
      </S.CartItemInfoWrapper>
    </S.CartItemWrapper>
  );
}

export default CartItem;
