import * as S from './style';

import CartAmountWithCoupon from '../CartAmountWithCoupon/CartAmountWithCoupon';
import CheckedItemContainer from '../CheckedItemContainer/CheckedItemContainer';
import DeliveryInfo from '../DeliveryInfo/DeliveryInfo';

export default function ConfirmationContainer() {
  return (
    <>
      <CheckedItemContainer />
      <S.SetCouponButton>쿠폰 적용</S.SetCouponButton>
      <DeliveryInfo />
      <CartAmountWithCoupon />
    </>
  );
}
