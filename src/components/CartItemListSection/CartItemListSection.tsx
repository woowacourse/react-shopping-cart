import { useEffect } from 'react';

import Title from '../common/Title/Title';
import Spacer from '../common/Spacer/Spacer';
import * as S from './CartItemListSection.style';
import PriceTable from '../PriceTable/PriceTable';
import CartItemList from '../CartItemList/CartItemList';
import useApiErrorState from '../../hooks/error/useApiErrorState';
import useCartItemList from '../../hooks/cartItem/useCartItemList';

const CartItemListSection = () => {
  const { cartItemList, fetchCartItemList } = useCartItemList();
  const { apiError } = useApiErrorState();

  useEffect(() => {
    fetchCartItemList();
  }, []);

  if (apiError?.name === 'FailedFetchCartItemlistError') {
    throw apiError;
  }

  return (
    <S.CartItemListSection>
      <Title
        title="장바구니"
        description={`현재 ${cartItemList.length}종류의 상품이 담겨있습니다.`}
      />
      <Spacer height={36} />
      <CartItemList cartItemList={cartItemList} />
      <Spacer height={52} />
      <PriceTable />
    </S.CartItemListSection>
  );
};

export default CartItemListSection;
