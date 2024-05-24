import useSelectAll from '@hooks/useSelectAll';
import useSelectedItems from '@hooks/useSelectedItems';
import { CartItem } from '@type/cartItem';
import * as S from './styled';
import SelectAll from '@components/serviceCommon/SelectAll/SelectAll';
import ShoppingCartItem from '../ShoppingCartItem/ShoppingCartItem';

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
