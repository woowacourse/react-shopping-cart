import { useRecoilState } from 'recoil';
import { selectedCartItemState } from '../../recoil/atoms/atoms';
import CheckButton from '../Button/CheckButton/CheckButton';
import CartItem from '../CartItem/CartItem';
import type { TCartItem } from '../../types/CartItem.type';
import { removeCartItems, updateCartItemQuantity } from '../../apis';
import * as S from './CartItemList.style';

function CartItemList({ cartItems, updateCartItems }: { cartItems: TCartItem[]; updateCartItems: () => void }) {
  const [selectedItems, setSelectedItems] = useRecoilState(selectedCartItemState);

  const isAllSelected = selectedItems.length === cartItems.length;

  const handleAllSelect = () => {
    if (isAllSelected) setSelectedItems([]);
    else setSelectedItems(cartItems);
  };

  const handleUpdateQuantity = async (cardItemId: number, quantity: number) => {
    const status = await updateCartItemQuantity(cardItemId, quantity);

    if (status === 200) {
      updateCartItems();

      const newSelectedItems = cartItems.filter((el) => selectedItems.some((item) => el.id === item.id));
      setSelectedItems(newSelectedItems);
    }
  };

  const handleRemoveItem = async (cartItemId: number) => {
    const status = await removeCartItems(cartItemId);

    if (status === 204) {
      updateCartItems();

      const newSelectedItems = cartItems.filter((el) => selectedItems.some((item) => el.id === item.id));
      setSelectedItems(newSelectedItems);
    }
  };

  return (
    <S.CartItems>
      <S.SelectAllButtonContainer>
        <CheckButton isChecked={isAllSelected} onClick={handleAllSelect} />
        <p>전체 선택</p>
      </S.SelectAllButtonContainer>
      {cartItems.map((el) => (
        <CartItem key={el.id} item={el} onRemoveItem={handleRemoveItem} onUpdateQuantity={handleUpdateQuantity} />
      ))}
    </S.CartItems>
  );
}

export default CartItemList;
