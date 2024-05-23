import * as S from './style';

import CartAmountWithCoupon from '../CartAmountWithCoupon/CartAmountWithCoupon';
import CheckedItemContainer from '../CheckedItemContainer/CheckedItemContainer';
import CouponModal from '../CouponModal/CouponModal';
import DeliveryInfo from '../DeliveryInfo/DeliveryInfo';
import { useState } from 'react';

export default function ConfirmationContainer() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  return (
    <>
      {isModalOpen && (
        <CouponModal
          onClose={() => setIsModalOpen(false)}
          onConfirm={() => setIsModalOpen(false)}
        />
      )}
      <CheckedItemContainer />
      <S.SetCouponButton onClick={() => setIsModalOpen(true)}>쿠폰 적용</S.SetCouponButton>
      <DeliveryInfo />
      <CartAmountWithCoupon />
    </>
  );
}
