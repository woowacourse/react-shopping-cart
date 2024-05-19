import * as S from './style';

import { removeCartItem, updateCartItemQuantity } from '../../apis';

import CartItem from '../CartItem/CartItem';
import CheckBox from '../CheckBox/CheckBox';
import { cartItemsState } from '../../recoil/selectors';
import useCheckedItemIds from '../../hooks/useCheckedItemIds';
import { useRecoilState } from 'recoil';

export default function CartItemContainer() {
  const [items, setItems] = useRecoilState(cartItemsState);
  const { getIsChecked, checkId, uncheckId, deleteId } = useCheckedItemIds();

  const ids = items.map((item) => item.id);
  const isAllChecked = ids.every((id) => getIsChecked(id));

  const handleAllCheckToggle = () => {
    if (isAllChecked) return uncheckId(...ids);
    return checkId(...ids);
  };

  const handleDeleteItem = async (cartItemId: number) => {
    await removeCartItem(cartItemId);
    deleteId(cartItemId);
    setItems((prevItems) => prevItems.filter((item) => item.id !== cartItemId));
  };

  const handleUpdateQuantity = async (cartItemId: number, quantity: number) => {
    await updateCartItemQuantity(cartItemId, quantity);
  };

  return (
    <>
      {items.length > 0 && (
        <S.Description>{`현재 ${items.length}종류의 상품이 담겨있습니다.`}</S.Description>
      )}
      <S.CartItemListContainer>
        <S.CheckAllBoxContainer>
          <CheckBox isChecked={isAllChecked} onClick={handleAllCheckToggle} />
          <span>전체선택</span>
        </S.CheckAllBoxContainer>

        {items.map((item) => {
          return (
            <CartItem
              key={item.id}
              cartItemId={item.id}
              product={item.product}
              quantity={item.quantity}
              handleDelete={(cartItemId: number) => {
                handleDeleteItem(cartItemId);
              }}
              handleIncreaseQuantity={(cartItemId: number, quantity: number) => {
                handleUpdateQuantity(cartItemId, quantity);
              }}
              handleDecreaseQuantity={(cartItemId: number, quantity: number) => {
                handleUpdateQuantity(cartItemId, quantity);
              }}
            />
          );
        })}
      </S.CartItemListContainer>
    </>
  );
}
