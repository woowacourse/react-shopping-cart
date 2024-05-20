import { useRecoilState } from 'recoil';

import { CartItem } from '../';
import { CheckBox } from '../../common';
import * as Styled from './CartItemContainer.style';

import { cartItemsState } from '../../../recoil/atoms';
import { removeCartItem, updateCartItemQuantity } from '../../../apis';
import { useCheckCartItem } from '../../../hooks';

export default function CartItemContainer() {
  const [items, setItems] = useRecoilState(cartItemsState);
  const { isAllChecked, onCheckCartItem, onCheckAllCartItem } = useCheckCartItem();

  const toggleAllCheck = () => {
    onCheckAllCartItem(!isAllChecked);
  };

  const handleDeleteItem = async (cartItemId: number) => {
    await removeCartItem(cartItemId);
    onCheckCartItem(cartItemId, false);
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
          <CheckBox type="button" isChecked={isAllChecked} onClick={toggleAllCheck} />
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
