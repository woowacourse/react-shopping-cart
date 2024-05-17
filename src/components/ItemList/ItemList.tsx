import { CartItem } from '../../type';
import Item from './Item';
import * as Styled from './style';
import CheckedBox from '../assets/CheckedBox.svg';
import UnCheckedBox from '../assets/UnCheckedBox.svg';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { selectedAllCartItemState } from '../../recoil/selectedCardItems';
import { adjustCartItemQuantity, removeCartItem } from '../../api/shoppingCart';
import {
  fetchedCartItemsState,
  refreshCartItemsState,
} from '../../recoil/cartItems';

const ItemList = () => {
  const updateCartItem = useSetRecoilState(refreshCartItemsState);
  const cartItems = useRecoilValue(fetchedCartItemsState);

  const handleDeleteCartItem = async (cartItemId: number) => {
    try {
      await removeCartItem(cartItemId);
      updateCartItem([]);
    } catch (error) {
      console.error('Failed to remove cart item:', error);
    }
  };
  const handleAdjustCartItemQuantity = async (
    cartItemId: number,
    quantity: number,
  ) => {
    try {
      await adjustCartItemQuantity(cartItemId, quantity);
      updateCartItem([]);
    } catch (error) {
      console.error('수량변경 실패', error);
    }
  };

  const cartItemIds = cartItems.map((cartItem) => cartItem.id);
  const [selectedAll, setSelectedAll] = useRecoilState(
    selectedAllCartItemState(cartItemIds),
  );
  const handleSelectedAll = () => {
    setSelectedAll((isSelectedAll) => !isSelectedAll);
  };

  return (
    <Styled.ItemList>
      <Styled.TotalSelect>
        <Styled.Button onClick={handleSelectedAll}>
          <img
            src={selectedAll ? CheckedBox : UnCheckedBox}
            alt={selectedAll ? '전체 선택' : '전체 선택 해제'}
          />
        </Styled.Button>
        <div>전체 선택</div>
      </Styled.TotalSelect>
      {cartItems.map((cartItem: CartItem) => {
        return (
          <Item
            key={cartItem.id}
            cartItem={cartItem}
            onRemoveItem={handleDeleteCartItem}
            onAdjustItemQuantity={handleAdjustCartItemQuantity}
          />
        );
      })}
    </Styled.ItemList>
  );
};

export default ItemList;
