import { CartItemType } from '../../type';
import CartItem from './CartItem';
import * as Styled from './style';
import CheckedBox from '../assets/CheckedBox.svg';
import UnCheckedBox from '../assets/UnCheckedBox.svg';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { selectedAllCartItemSelector } from '../../recoil/selectedCardItems';
import { removeCartItem } from '../../api/shoppingCart';
import { refreshCartItemsState } from '../../recoil/cartItems';
import { fetchedCartItemsSelector } from '../../recoil/fetch';

const CartItemList = () => {
  const cartItems = useRecoilValue(fetchedCartItemsSelector);

  const [selectedAll, setSelectedAll] = useRecoilState(
    selectedAllCartItemSelector,
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
      if (error instanceof Error) alert(error.message);
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
