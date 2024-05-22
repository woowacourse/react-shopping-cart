import * as S from './style';

import CartItem from '../CartItem/CartItem';
import CheckBox from '../CheckBox/CheckBox';
import { cartItemsState } from '../../recoil/atoms';
import { removeCartItem } from '../../apis';
import useCheckedItemIds from '../../hooks/useCheckedItemIds';
import useItemQuantity from '../../hooks/useItemQuantity';
import { useRecoilState } from 'recoil';

export default function CartItemContainer() {
  const [items, setItems] = useRecoilState(cartItemsState);
  const { getIsChecked, checkIds: checkId, uncheckIds: uncheckId } = useCheckedItemIds();
  const { increaseQuantity, decreaseQuantity } = useItemQuantity();

  const ids = items.map((item) => item.id);
  const isAllChecked = ids.every((id) => getIsChecked(id));

  const handleAllCheckToggle = () => {
    if (isAllChecked) return uncheckId(...ids);
    return checkId(...ids);
  };

  const handleDeleteItem = async (cartItemId: number) => {
    checkId(cartItemId);
    setItems((prevItems) => prevItems.filter((item) => item.id !== cartItemId));
    await removeCartItem(cartItemId).catch(() => {
      alert('네트워크 접속이 불안정합니다. 다시 시도해주세요');
      setItems(items);
    });
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
              handleClickCheckBox={() =>
                getIsChecked(item.id) ? uncheckId(item.id) : checkId(item.id)
              }
              key={item.id}
              cartItem={item}
              isChecked={getIsChecked(item.id)}
              handleDelete={() => handleDeleteItem(item.id)}
              handleIncreaseQuantity={async () => increaseQuantity(item.id)}
              handleDecreaseQuantity={async () => decreaseQuantity(item.id)}
            />
          );
        })}
      </S.CartItemListContainer>
    </>
  );
}
