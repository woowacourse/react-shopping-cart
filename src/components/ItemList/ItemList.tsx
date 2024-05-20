import { CartItem } from '../../type';
import Item from './Item';
import * as Styled from './style';
import SelectedBox from '../assets/SelectedBox.svg';
import UnSelectedBox from '../assets/UnSelectedBox.svg';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { selectedAllCartItemState } from '../../recoil/selectedCardItems';
import { adjustCartItemQuantity, removeCartItem } from '../../api/shoppingCart';
import {
  fetchedCartItemsState,
  refreshCartItemsState,
} from '../../recoil/cartItems';
import MESSAGE from '../../constants/Message';

const ItemList = () => {
  const updateCartItem = useSetRecoilState(refreshCartItemsState);
  const cartItems = useRecoilValue(fetchedCartItemsState);

  const handleRemoveCartItem = async (cartItemId: number) => {
    try {
      await removeCartItem(cartItemId);
      updateCartItem([]);
    } catch (error) {
      console.error(MESSAGE.removeError, error);
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
      console.error(MESSAGE.adjustQuantityError, error);
    }
  };

  const cartItemIds = cartItems.map((cartItem) => cartItem.id);
  const [isAllSelected, setisAllSelected] = useRecoilState(
    selectedAllCartItemState(cartItemIds),
  );
  const handleSelectedAll = () => {
    setisAllSelected((isSelectedAll) => !isSelectedAll);
  };

  return (
    <Styled.ItemList>
      <Styled.AllSelectContainer>
        <Styled.SelectButton onClick={handleSelectedAll}>
          <img
            src={isAllSelected ? SelectedBox : UnSelectedBox}
            alt={isAllSelected ? MESSAGE.allSelected : MESSAGE.notAllSelected}
          />
        </Styled.SelectButton>
        <Styled.SelectMessage>{MESSAGE.allSelected}</Styled.SelectMessage>
      </Styled.AllSelectContainer>
      {cartItems.map((cartItem: CartItem) => {
        return (
          <Item
            key={cartItem.id}
            cartItem={cartItem}
            onRemoveItem={handleRemoveCartItem}
            onAdjustItemQuantity={handleAdjustCartItemQuantity}
          />
        );
      })}
    </Styled.ItemList>
  );
};

export default ItemList;
