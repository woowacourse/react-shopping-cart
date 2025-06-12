import SelectInput from '../../../shared/ui/SelectInput';
import CartItemCard from './CartItemCard';
import * as S from './CartList.styles';
import { CartItem } from '../types/cart';
import { useCartItemsContext } from '../context/useCartItemsContext';
import { useSelectedCartItemsContext } from '../context/useSelectedCartItemsContext';

interface CartListProps {
  addAllCartItemsInSelected: (items: CartItem[]) => void;
}

export default function CartList({ addAllCartItemsInSelected }: CartListProps) {
  const { cartItems } = useCartItemsContext();
  const { selectedCartItems } = useSelectedCartItemsContext();

  const isAllSelected = cartItems.length > 0 && selectedCartItems.length === cartItems.length;

  const handleAllCartItemsInSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    if (!isChecked) {
      addAllCartItemsInSelected([]);
      return;
    }
    addAllCartItemsInSelected(cartItems);
  };

  return (
    <S.CartListContainer>
      <S.AllSelectContainer>
        <SelectInput checked={isAllSelected} onChange={handleAllCartItemsInSelected} />
        <span>전체 선택</span>
      </S.AllSelectContainer>
      <S.CartItemCardContainer>
        {cartItems.map((cartItem) => (
          <CartItemCard key={cartItem.id} cartItem={cartItem} />
        ))}
      </S.CartItemCardContainer>
    </S.CartListContainer>
  );
}
