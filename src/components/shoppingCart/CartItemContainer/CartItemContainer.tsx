import { useRecoilState } from 'recoil';

import { CartItem } from '../';
import { CheckBox } from '../../common';
import * as Styled from './CartItemContainer.style';

import { cartItemsState } from '../../../recoil/atoms';
import { removeCartItem } from '../../../apis';
import { useCheckCartItem, useFetchError } from '../../../hooks';
import { ERROR_MESSAGE } from '../../../apis/fetchData/errorMessage';

export default function CartItemContainer() {
  const [items, setItems] = useRecoilState(cartItemsState);
  const { isAllChecked, onCheckCartItem, onCheckAllCartItem } = useCheckCartItem();
  const { throwFetchError, resetFetchError } = useFetchError();

  const toggleAllCheck = () => {
    onCheckAllCartItem(!isAllChecked);
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
              quantity={item.quantity}
              onDelete={(cartItemId: number) => handleDeleteItem(cartItemId)}
            />
          );
        })}
      </Styled.CartItemListContainer>
    </>
  );
}
