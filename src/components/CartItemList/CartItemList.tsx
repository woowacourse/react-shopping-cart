import { useRecoilState } from 'recoil';
import { selectedCartItemState } from '../../recoil/atoms/atoms';
import CheckButton from '../Button/CheckButton/CheckButton';
import CartItem from '../CartItem/CartItem';
import type { TCartItem } from '../../types/CartItem.type';
import { removeCartItems, updateCartItemQuantity } from '../../apis';
import * as S from './CartItemList.style';

interface CartItemListProps {
  cartItems: TCartItem[];
  updateCartItems: () => void;
}

function CartItemList({ cartItems, updateCartItems }: CartItemListProps) {
  const [selectedItems, setSelectedItems] = useRecoilState(selectedCartItemState);

  const isAllSelected = selectedItems.length === cartItems.length;

  const handleAllSelect = () => {
    if (isAllSelected) setSelectedItems([]);
    else setSelectedItems(cartItems);
  };

  const handleUpdateQuantity = async (cardItemId: number, quantity: number) => {
    await updateCartItemQuantity(cardItemId, quantity);
    updateCartItems();
  };

  const handleRemoveItem = async (cartItemId: number) => {
    await removeCartItems(cartItemId);
    updateCartItems();
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
