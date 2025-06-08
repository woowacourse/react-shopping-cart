import { useSelection } from '@/shared';
import { Modal, useModalContext } from '@jae-o/modal-component-module';
import { useEffect } from 'react';
import { CouponItem, Coupon } from '..';
import * as S from './CouponModal.styles';

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
  const { open } = useModalContext();
  const {
    selected: selectedIds,
    set: setSelectedIds,
    toggle: toggleSelect,
    isSelected,
  } = useSelection(new Set(couponAppliedIds), 2);
  const totalDiscount = coupons
    .filter((coupon) => isSelected(coupon.data.id))
    .reduce((acc, coupon) => acc + coupon.discountAmount, 0);

  useEffect(() => {
    if (!open) return;

    setSelectedIds(couponAppliedIds);
  }, [couponAppliedIds, setSelectedIds, open]);

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
              selected={isSelected(coupon.data.id)}
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
