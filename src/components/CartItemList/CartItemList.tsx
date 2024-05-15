import * as S from './CartItemList.style';

import Checkbox from '../common/Checkbox/Checkbox';
import Text from '../common/Text/Text';
import CartItem from '../CartItem/CartItem';
import { useRecoilValue } from 'recoil';
import { cartItemSelectedIdListAtom } from '../../recoil/cartItem/cartItemAtom';
import { useCartItemSelectedIdList } from '../../recoil/cartItem/useCartItemSelectedIdList';

interface CartItemListProps {
  itemList: CartItem[];
}

const CartItemList = ({ itemList }: CartItemListProps) => {
  const selectedIdList = useRecoilValue(cartItemSelectedIdListAtom);
  const isSelectedAll = selectedIdList.length === itemList.length;
  const { removeAll, selectAll } = useCartItemSelectedIdList();

  return (
    <S.CartItemList>
      <S.SelectAllContainer>
        <Checkbox state={isSelectedAll} handleClick={isSelectedAll ? removeAll : selectAll} />
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
