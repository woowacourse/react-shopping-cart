import { CartItem } from '../../api/get/getItems';
import SelectAll from '../SelectAll/SelectAll';
import ShoppingCartItem from '../ShoppingCartItem/ShoppingCartItem';
import * as S from './styled';

interface ShoppingCartListProps {
  cartItems: CartItem[];
}

const ShoppingCartList = ({ cartItems }: ShoppingCartListProps) => {
  return (
    <S.Container>
      <SelectAll isSelectAll={false} />
      {cartItems.map(cartItem => (
        <ShoppingCartItem key={cartItem.id} cartItem={cartItem} />
      ))}
    </S.Container>
  );
};

export default ShoppingCartList;
