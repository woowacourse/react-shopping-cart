import { Modal } from '@jae-o/modal-component-module';
import CouponItem from '../couponItem/CouponItem';
import Coupon from '../models/coupon';
import * as S from './CouponModal.styles';
import { useEffect, useState } from 'react';

interface CouponModalProps {
  coupons: Coupon[];
  orderPrice: number;
  couponSelectedIds: number[];
  applyCoupons: (couponIds: number[]) => void;
}

function CouponModal({
  coupons,
  orderPrice,
  couponSelectedIds,
  applyCoupons,
}: CouponModalProps) {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const toggleSelect = (couponId: number) => {
    setSelectedIds((prev) => {
      if (prev.includes(couponId)) {
        return prev.filter((id) => id !== couponId);
      }
      if (prev.length < 2) {
        return [...prev, couponId];
      }
      return prev;
    });
  };

  useEffect(() => {
    setSelectedIds(couponSelectedIds);
  }, [couponSelectedIds]);

  return (
    <Modal.Container title="쿠폰 적용" style={{ gap: '32px' }}>
      <S.CouponContainer>
        <S.NoticeBox>
          <img src="./assets/Notification.svg" alt="알림" />
          <S.NoticeText>쿠폰은 최대 2개까지 사용할 수 있습니다.</S.NoticeText>
        </S.NoticeBox>
        <S.CouponList>
          {coupons.map((coupon) => (
            <CouponItem
              key={coupon.data.id}
              item={coupon}
              selected={selectedIds.includes(coupon.data.id)}
              disabled={coupon.isDisable(orderPrice)}
              toggleSelect={() => toggleSelect(coupon.data.id)}
            />
          ))}
        </S.CouponList>
      </S.CouponContainer>
      <Modal.CloseTrigger asChild>
        <Modal.WideButton onClick={() => applyCoupons(selectedIds)}>
          총 6,000원 할인 쿠폰 사용하기
        </Modal.WideButton>
      </Modal.CloseTrigger>
    </Modal.Container>
  );
}

export default CouponModal;
