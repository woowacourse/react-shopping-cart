import { useRecoilState } from 'recoil';

import { CartItem } from '../';
import { CheckBox } from '../../common';
import * as Styled from './CartItemContainer.style';

import { currentCartItemsState } from '../../../recoil/atoms';
import { removeCartItem, updateCartItemQuantity } from '../../../apis';
import { useCheckedItemIds } from '../../../hooks';

export default function CartItemContainer() {
  const [items, setItems] = useRecoilState(currentCartItemsState);
  const { getIsChecked, checkId, uncheckId, deleteId } = useCheckedItemIds();

  const ids = items.map((item) => item.id);
  const isAllChecked = ids.every((id) => getIsChecked(id));

  const handleAllCheck = () => {
    checkId(...ids);
  };

  const handleAllUncheck = () => {
    uncheckId(...ids);
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
        <Styled.Description>{`현재 ${items.length}종류의 상품이 담겨있습니다.`}</Styled.Description>
      )}
      <Styled.CartItemListContainer>
        <Styled.CheckAllBoxContainer>
          <CheckBox
            isChecked={isAllChecked}
            onClick={isAllChecked ? handleAllUncheck : handleAllCheck}
          />
          <span>전체선택</span>
        </Styled.CheckAllBoxContainer>

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
      </Styled.CartItemListContainer>
    </>
  );
}
