import SelectInput from '../../../shared/ui/SelectInput';
import CartItemCard from './CartItemCard';
import * as S from './CartList.styles';
import { CartItem } from '../../../shared/types/cart';
import { useSelectedCartContext } from '../../../shared/context/useSelectedCartContext';

interface CartListProps {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

export default function CartList({ cartItems, setCartItems }: CartListProps) {
  const { selectedCartItems, addAllCartItemsInSelected } = useSelectedCartContext();

  const selectedIds = new Set(selectedCartItems.map((item) => item.id));
  const isAllSelected = cartItems.length > 0 && cartItems.every((cartItem) => selectedIds.has(cartItem.id));

  const handleAllCartItemsInSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    addAllCartItemsInSelected(isChecked ? cartItems : []);
  };

  return (
    <S.CartListContainer>
      <S.AllSelectContainer>
        <SelectInput type='checkbox' onChange={handleAllCartItemsInSelected} checked={isAllSelected} />
        <span>전체 선택</span>
      </S.AllSelectContainer>
      <S.CartItemCardContainer>
        {cartItems.map((cartItem) => (
          <CartItemCard key={cartItem.id} cartItem={cartItem} setCartItems={setCartItems} />
        ))}
      </S.CartItemCardContainer>
    </S.CartListContainer>
  );
}
