import * as S from './CartItemList.style';

import CartItem from '../CartItem/CartItem';

import Checkbox from '../common/Checkbox/Checkbox';
import Text from '../common/Text/Text';

import { useRecoilValue } from 'recoil';
import { cartItemSelectedIdListAtom } from '../../recoil/cartItem/cartItemAtom';
import { useCartItemSelectedIdList } from '../../recoil/cartItem/useCartItemSelectedIdList';
import { cartItemListState } from '../../recoil/cartItemList/cartItemListSelector';


const CartItemList = () => {
  const cartItemList = useRecoilValue(cartItemListState);
  const selectedIdList = useRecoilValue(cartItemSelectedIdListAtom);
  const isSelectedAll = selectedIdList.length === cartItemList.length;
  const { unselectAll, selectAll } = useCartItemSelectedIdList();

  return (
    <S.CartItemList>
      <S.SelectAllContainer>
        <Checkbox state={isSelectedAll} handleClick={isSelectedAll ? unselectAll : selectAll} />
        <Text size="s" weight="m">
          전체선택
        </Text>
      </S.SelectAllContainer>
      {cartItemList.map(({ product, quantity, cartItemId }: CartItem) => {
        return <CartItem key={cartItemId} product={product} quantity={quantity} cartItemId={cartItemId} />;
      })}
    </S.CartItemList>
  );
};

export default CartItemList;
