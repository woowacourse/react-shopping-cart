import { Modal } from '@jae-o/modal-component-module';
import CouponItem from '../couponItem/CouponItem';
import Coupon from '../models/coupon';
import * as S from './CouponModal.styles';
import { useEffect, useState } from 'react';

interface CouponModalProps {
  coupons: Coupon[];
  couponAppliedIds: Set<number>;
  applyCoupons: (couponIds: Set<number>) => void;
}

function CouponModal({
  coupons,
  couponAppliedIds,
  applyCoupons,
}: CouponModalProps) {
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const totalDiscount = coupons
    .filter((coupon) => selectedIds.has(coupon.data.id))
    .reduce((acc, coupon) => acc + coupon.discountAmount, 0);

  const toggleSelect = (couponId: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(couponId)) {
        next.delete(couponId);
      } else if (next.size < 2) {
        next.add(couponId);
      }
      return next;
    });
  };

  useEffect(() => {
    setSelectedIds(couponAppliedIds);
  }, [couponAppliedIds]);

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
              selected={selectedIds.has(coupon.data.id)}
              disabled={coupon.disable}
              toggleSelect={() => toggleSelect(coupon.data.id)}
            />
          ))}
        </S.CouponList>
      </S.CouponContainer>
      <Modal.CloseTrigger asChild>
        <Modal.WideButton onClick={() => applyCoupons(selectedIds)}>
          {`총 ${totalDiscount.toLocaleString()}원 할인 쿠폰 사용하기`}
        </Modal.WideButton>
      </Modal.CloseTrigger>
    </Modal.Container>
  );
}

export default CouponModal;
