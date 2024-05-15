import * as S from './CartItemList.style';

import Checkbox from '../common/Checkbox/Checkbox';
import Text from '../common/Text/Text';
import CartItem from '../CartItem/CartItem';
import useCartListItem from '../../recoil/cartItemList/useTest';

interface CartItemListProps {
  itemList: CartItem[];
}

const CartItemList = ({ itemList }: CartItemListProps) => {
  return (
    <S.CartItemList>
      <S.SelectAllContainer>
        <Checkbox />
        <Text size="s" weight="m">
          전체선택
        </Text>
      </S.SelectAllContainer>
      {itemList.map(({ product, quantity, cartItemId }: CartItem) => {
        return <CartItem product={product} quantity={quantity} cartItemId={cartItemId} />;
      })}
    </S.CartItemList>
  );
};

export default CartItemList;
