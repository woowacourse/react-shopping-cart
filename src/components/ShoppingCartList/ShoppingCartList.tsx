import { CartItem } from '../../api/get/getItems';
import useSelectedItems from '../../hooks/useSelectedItems';
import SelectAll from '../SelectAll/SelectAll';
import ShoppingCartItem from '../ShoppingCartItem/ShoppingCartItem';
import * as S from './styled';

interface ShoppingCartListProps {
  cartItems: CartItem[];
}

const ShoppingCartList = ({ cartItems }: ShoppingCartListProps) => {
  const { onCheckboxClick, isSelected, all, onSelectAllClick } = useSelectedItems(cartItems);
  return (
    <S.Container>
      <SelectAll isSelectAll={all} onSelectAllClick={onSelectAllClick} />
      {cartItems.map(cartItem => (
        <ShoppingCartItem
          key={cartItem.id}
          cartItem={cartItem}
          isSelected={isSelected}
          onCheckboxClick={onCheckboxClick}
        />
      ))}
    </S.Container>
  );
};

export default ShoppingCartList;
