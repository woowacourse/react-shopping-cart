import { Modal } from '@jae-o/modal-component-module';
import * as S from './CouponModal.styles';
import { CouponType } from '../types';
import CouponItem from '../couponItem/CouponItem';

interface CouponModalProps {
  coupons: CouponType[];
  couponSelectedIds: number[];
  toggleSelect: (couponId: number) => void;
}

function CouponModal({
  coupons,
  couponSelectedIds,
  toggleSelect,
}: CouponModalProps) {
  return (
    <Modal.Container title="쿠폰 적용" style={{ gap: '32px' }}>
      <S.CouponContainer>
        <S.NoticeBox>
          <img src="./assets/Notification.svg" alt="알림" />
          <S.NoticeText>쿠폰은 최대 2개까지 사용할 수 있습니다.</S.NoticeText>
        </S.NoticeBox>
        <S.CouponList>
          {coupons.map((coupon) => {
            const isSelected = couponSelectedIds.includes(coupon.id);
            return (
              <CouponItem
                key={coupon.id}
                item={coupon}
                isSelected={isSelected}
                toggleSelect={() => toggleSelect(coupon.id)}
              />
            );
          })}
        </S.CouponList>
      </S.CouponContainer>
      <Modal.CloseTrigger asChild>
        <Modal.WideButton>총 6,000원 할인 쿠폰 사용하기</Modal.WideButton>
      </Modal.CloseTrigger>
    </Modal.Container>
  );
}

export default CouponModal;
