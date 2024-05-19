import * as S from './CartItemList.style';
import CartItem from '../CartItem/CartItem';
import Checkbox from '../common/Checkbox/Checkbox';
import Text from '../common/Text/Text';
import { useRecoilValue } from 'recoil';
import { selectedCartItemIdListAtom } from '../../recoil/selectedCartItemIdList/states';
import { useSelectedCartItemIdList } from '../../recoil/selectedCartItemIdList/hooks';
import { cartItemListAtom } from '../../recoil/cartItemList/states';

const CartItemList = () => {
  const itemList = useRecoilValue(cartItemListAtom);
  const selectedIdList = useRecoilValue(selectedCartItemIdListAtom);
  const isSelectedAll = selectedIdList.length === itemList.length;
  const { clear, selectAll } = useSelectedCartItemIdList();

  return (
    <S.CartItemList>
      <S.SelectAllContainer>
        <Checkbox alt="상품 선택" state={isSelectedAll} handleClick={isSelectedAll ? clear : selectAll} />
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
