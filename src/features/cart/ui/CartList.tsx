import SelectInput from '../../../shared/ui/SelectInput';
import CartItemCard from './CartItemCard';
import * as S from './CartList.styles';
import { CartItem } from '../../../shared/type/cart';
import { useCartItemsContext } from '../../../shared/context/useCartItemsContext';

interface CartListProps {
  addAllCartItemsInSelected: (items: CartItem[]) => void;
}

export default function CartList({ addAllCartItemsInSelected }: CartListProps) {
  const { cartItems } = useCartItemsContext();

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
        <SelectInput onChange={handleAllCartItemsInSelected} />
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
