import { CartItemType } from '../../type';
import CartItem from './CartItem';
import * as Styled from './style';
import CheckedBox from '../assets/CheckedBox.svg';
import UnCheckedBox from '../assets/UnCheckedBox.svg';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { selectedAllCartItemState } from '../../recoil/selectedCardItems';
import { removeCartItem } from '../../api/shoppingCart';
import {
  fetchedCartItemsState,
  refreshCartItemsState,
} from '../../recoil/cartItems';

const CartItemList = () => {
  const cartItems = useRecoilValue(fetchedCartItemsState);

  const [selectedAll, setSelectedAll] = useRecoilState(
    selectedAllCartItemState,
  );
  const handleSelectedAll = () => {
    setSelectedAll((isSelectedAll) => !isSelectedAll);
  };

  const updateCartItem = useSetRecoilState(refreshCartItemsState);

  const handleDeleteCartItem = async (cartItemId: number) => {
    try {
      await removeCartItem(cartItemId);
      updateCartItem([]);
    } catch (error) {
      console.error('Failed to remove cart item:', error);
    }
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
      {cartItems.map((cartItem: CartItemType) => {
        return (
          <CartItem
            key={cartItem.id}
            id={cartItem.id}
            cartItemProduct={cartItem.product}
            onRemoveItem={handleDeleteCartItem}
          />
        );
      })}
    </Styled.ItemList>
  );
};

export default CartItemList;
