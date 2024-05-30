import { useRecoilState } from 'recoil';

import { CartItem } from '../';
import { CheckBox } from '../../common';
import * as Styled from './CartItemContainer.style';

import { cartItemsState } from '../../../recoil/atoms';
import { removeCartItem, updateCartItemQuantity } from '../../../apis';
import { useCheckCartItem, useFetchError } from '../../../hooks';
import { ERROR_MESSAGE } from '../../../apis/constants/errorMessage';

export default function CartItemContainer() {
  const [items, setItems] = useRecoilState(cartItemsState);
  const { isAllChecked, onCheckCartItem, onCheckAllCartItem } = useCheckCartItem();
  const { throwFetchError, resetFetchError } = useFetchError();

  const toggleAllCheck = () => {
    onCheckAllCartItem(!isAllChecked);
  };

  const handleUpdateQuantityItem = async (cartItemId: number, quantity: number) => {
    try {
      await updateCartItemQuantity(cartItemId, quantity);
      setItems((prevItems) =>
        prevItems.map((item) => {
          if (item.id === cartItemId) return { ...item, quantity };
          return item;
        }),
      );
      resetFetchError();
    } catch (error) {
      throwFetchError(error, ERROR_MESSAGE.UPDATE_QUANTITY_FAILED);
    }
  };

  const handleDeleteItem = async (cartItemId: number) => {
    try {
      await removeCartItem(cartItemId);
      onCheckCartItem(cartItemId, false);
      setItems((prevItems) => prevItems.filter((item) => item.id !== cartItemId));
      resetFetchError();
    } catch (error) {
      throwFetchError(error, ERROR_MESSAGE.REMOVE_FROM_CART_FAILED);
    }
  };

  return (
    <>
      {items.length > 0 && (
        <Styled.Description>{`현재 ${items.length}종류의 상품이 담겨있습니다.`}</Styled.Description>
      )}
      <Styled.CartItemListContainer>
        <Styled.CheckAllBoxContainer>
          <CheckBox isChecked={isAllChecked} onClick={toggleAllCheck} />
          <span>전체선택</span>
        </Styled.CheckAllBoxContainer>

        {items.map((item) => {
          return (
            <CartItem
              key={item.id}
              cartItemId={item.id}
              product={item.product}
              onUpdateQuantity={handleUpdateQuantityItem}
              onDelete={handleDeleteItem}
            />
          );
        })}
      </Styled.CartItemListContainer>
    </>
  );
}
