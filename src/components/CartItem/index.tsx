import { useDispatch } from "react-redux";

import { actionCreators as CartActions, CartItem as CartItemType } from "../../redux/modules/cart";

import * as S from "./styles";

import deleteIcon from "../../assets/deleteIcon_gray.png";

interface CartItemProps {
  cartItem: CartItemType;
}

function CartItem({ cartItem }: CartItemProps) {
  const dispatch = useDispatch();
  const { id, name, img, price } = cartItem.detail;

  const onClickDeleteItem = () => {
    if (confirm("상품을 장바구니에서 삭제하시겠습니까?")) {
      dispatch(CartActions.deleteItem(id));
    }
  };

  const onClickIncreaseCounter = () => {
    dispatch(CartActions.increment(id));
  };

  const onClickDecreaseCounter = () => {
    if (cartItem.amount > 1) dispatch(CartActions.decrement(id));
  };

  return (
    <S.CartItemWrapper>
      <input
        type="checkbox"
        checked={cartItem.isSelected}
        onClick={(e) => {
          const targetInput = e.target as HTMLInputElement;
          dispatch(CartActions.toggleItemSelected(cartItem.detail.id, targetInput.checked));
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
