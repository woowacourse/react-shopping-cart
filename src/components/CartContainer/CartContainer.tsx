import * as S from './style';

import CartItemContainer from '../CartItemContainer/CartItemContainer';
import DeliveryInfo from '../DeliveryInfo/DeliveryInfo';
import OrderAmount from '../OrderAmount/OrderAmount';
import { cartItemsState } from '../../recoil/atoms';
import { useRecoilValue } from 'recoil';

export default function CartContainer() {
  const items = useRecoilValue(cartItemsState);

  if (items.length === 0) {
    return <S.EmptyCartContainer>장바구니에 담은 상품이 없습니다.</S.EmptyCartContainer>;
  }

  return (
    <>
      <CartItemContainer />
      <S.SetCouponButton>쿠폰 적용</S.SetCouponButton>
      <DeliveryInfo />
      <OrderAmount />
    </>
  );
}
