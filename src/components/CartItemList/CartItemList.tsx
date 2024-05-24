import * as S from './CartItemList.style';
import CartItemWithControl from '../CartItem/WithControl/CartItemWithControl';
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
  const { clearSelectedCartItemIdList, selectAllCartItem } = useSelectedCartItemIdList();

  return (
    <S.CartItemList>
      <S.SelectAllContainer>
        <Checkbox
          alt="상품 선택"
          checked={isSelectedAll}
          handleClick={isSelectedAll ? clearSelectedCartItemIdList : selectAllCartItem}
        />
        <Text size="s" weight="m">
          전체선택
        </Text>
      </S.SelectAllContainer>
      {itemList.map(({ product, quantity, cartItemId }: CartItemWithControl) => {
        return <CartItemWithControl key={cartItemId} product={product} quantity={quantity} cartItemId={cartItemId} />;
      })}
    </S.CartItemList>
  );
};

export default CartItemList;
