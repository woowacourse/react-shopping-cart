import { useEffect, useState } from 'react';
import * as S from './CartItemListSection.style'
import useCartListItem from '../../recoil/cartItemList/useCartItemList';

import Title from '../common/Title/Title';
import Spacer from '../common/Spacer/Spacer';
import CartItemList from '../CartItemList/CartItemList';
import PriceTable from '../PriceTable/PriceTable';
import { useRecoilValue } from 'recoil';
import { cartItemListState } from '../../recoil/cartItemList/cartItemListSelector';

const CartItemListSection = () => {

  const { updateCartItemList } = useCartListItem();
  const cartItemList = useRecoilValue(cartItemListState);

  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await updateCartItemList();
      } catch (err) {
        setError(err as Error);
      }
    };

    fetchData();
  }, []);

  if (error) {
    throw error;
  }

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