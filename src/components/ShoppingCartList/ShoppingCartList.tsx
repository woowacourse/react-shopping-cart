import SelectAll from '../SelectAll/SelectAll';
import ShoppingCartItem from '../ShoppingCartItem/ShoppingCartItem';

import { CartItem } from '../../api/get/getItems';
import useItemQuantity from '../../hooks/useItemQuantity';
import useSelectedItem from '../../hooks/useSelectedItem';
import useSelectedItems from '../../hooks/useSelectedItems';
import * as S from './styled';

interface ShoppingCartListProps {
  cartItems: CartItem[];
  refetch: () => Promise<void>;
}

const ShoppingCartList = ({ cartItems, refetch }: ShoppingCartListProps) => {
  const { getOneItemQuantity, setOneItemQuantity } = useItemQuantity(cartItems);

  const { isSelected, toggleItemSelection, updateSelectedItemQuantity } =
    useSelectedItem(getOneItemQuantity);
  const { allSelectedItems, onSelectAllClick } = useSelectedItems(cartItems);

  return (
    <S.Container>
      <SelectAll isSelectAll={allSelectedItems} onSelectAllClick={onSelectAllClick} />
      {cartItems.map(cartItem => (
        <ShoppingCartItem
          key={cartItem.id}
          cartItem={cartItem}
          isSelected={isSelected}
          toggleItemSelection={toggleItemSelection}
          updateSelectedItemQuantity={updateSelectedItemQuantity}
          getOneItemQuantity={getOneItemQuantity}
          setOneItemQuantity={setOneItemQuantity}
          refetch={refetch}
        />
      ))}
    </S.Container>
  );
};

export default ShoppingCartList;
