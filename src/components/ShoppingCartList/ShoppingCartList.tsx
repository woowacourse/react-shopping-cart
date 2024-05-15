import { CartItem } from '../../api/get/getItems';
import useItemQuantity from '../../hooks/useItemQuantity';
import useSelectedItems from '../../hooks/useSelectedItems';
import SelectAll from '../SelectAll/SelectAll';
import ShoppingCartItem from '../ShoppingCartItem/ShoppingCartItem';
import * as S from './styled';

interface ShoppingCartListProps {
  cartItems: CartItem[];
}

const ShoppingCartList = ({ cartItems }: ShoppingCartListProps) => {
  const { getOneItemQuantity, setOneItemQuantity } = useItemQuantity(cartItems);

  const { onCheckboxClick, isSelected, all, onSelectAllClick, selectedItemQuantity } =
    useSelectedItems(cartItems, getOneItemQuantity);

  return (
    <S.Container>
      <SelectAll isSelectAll={all} onSelectAllClick={onSelectAllClick} />
      {cartItems.map(cartItem => (
        <ShoppingCartItem
          key={cartItem.id}
          cartItem={cartItem}
          isSelected={isSelected}
          onCheckboxClick={onCheckboxClick}
          selectedItemQuantity={selectedItemQuantity}
          getOneItemQuantity={getOneItemQuantity}
          setOneItemQuantity={setOneItemQuantity}
        />
      ))}
    </S.Container>
  );
};

export default ShoppingCartList;
