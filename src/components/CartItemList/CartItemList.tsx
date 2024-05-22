import * as S from './CartItemList.style';
import CartItem from '../CartItem/CartItem';
import Checkbox from '../common/Checkbox/Checkbox';
import Text from '../common/Text/Text';
import { useRecoilValue } from 'recoil';
import { useSelectedCartItemIdList } from '../../recoil/selectedCartItemList/useSelectedCartItemIdList';
import { cartItemListState } from '../../recoil/cartItemList/cartItemListState';
import { selectedCartItemIdListState } from '../../recoil/selectedCartItemList/selectedCartItemIdListState';

const CartItemList = () => {
  const itemList = useRecoilValue(cartItemListState);
  const selectedIdList = useRecoilValue(selectedCartItemIdListState);
  const isSelectedAll = selectedIdList.length === itemList.length;
  const { clear, selectAll } = useSelectedCartItemIdList();

  return (
    <S.CartItemList>
      <S.SelectAllContainer>
        <Checkbox alt="상품 선택" checked={isSelectedAll} handleClick={isSelectedAll ? clear : selectAll} />
        <Text size="s" weight="m">
          전체선택
        </Text>
      </S.SelectAllContainer>
      {itemList.map(({ product, quantity, cartItemId }: CartItem) => {
        return <CartItem key={cartItemId} product={product} quantity={quantity} cartItemId={cartItemId} />;
      })}
    </S.CartItemList>
  );
};

export default CartItemList;
