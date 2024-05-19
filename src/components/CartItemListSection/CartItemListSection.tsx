import * as S from './CartItemListSection.style'

import Title from '../common/Title/Title';
import Spacer from '../common/Spacer/Spacer';
import CartItemList from '../CartItemList/CartItemList';
import PriceTable from '../PriceTable/PriceTable';
import { useRecoilValue } from 'recoil';
import { cartItemListQuery } from '../../recoil/cartItemList/cartItemListSelector';

const CartItemListSection = () => {
  const cartItemList = useRecoilValue(cartItemListQuery);

  return (
    <S.CartItemListSection>
      <Title title="장바구니" description={`현재 ${cartItemList.length}종류의 상품이 담겨있습니다.`} />
      <Spacer height={36} />
      <CartItemList itemList={cartItemList} />
      <Spacer height={52} />
      <PriceTable />
    </S.CartItemListSection>
  )
}

export default CartItemListSection;