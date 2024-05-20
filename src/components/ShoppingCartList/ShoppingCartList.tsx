import useSelectAll from '../../hooks/useSelectAll';
import useSelectedItems from '../../hooks/useSelectedItems';
import { CartItem } from '../../types/cartItem';
import SelectAll from '../SelectAll/SelectAll';
import ShoppingCartItem from '../ShoppingCartItem/ShoppingCartItem';
import * as S from './styled';

interface ShoppingCartListProps {
  cartItems: CartItem[];
  refetch: () => Promise<void>;
}

const ShoppingCartList = ({ cartItems, refetch }: ShoppingCartListProps) => {
  const { onCheckboxClick, isSelected } = useSelectedItems(cartItems);
  const { all, onSelectAllClick } = useSelectAll(cartItems);

  return (
    <S.Container>
      <SelectAll isSelectAll={all} onSelectAllClick={onSelectAllClick} />
      {cartItems.map(cartItem => (
        <ShoppingCartItem
          key={cartItem.id}
          cartItem={cartItem}
          isSelected={isSelected}
          onCheckboxClick={onCheckboxClick}
          refetch={refetch}
        />
      ))}
    </S.Container>
  );
};

export default ShoppingCartList;
