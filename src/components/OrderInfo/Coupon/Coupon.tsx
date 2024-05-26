import { Modal } from 'cookie-nice-modal';
import { useReducer } from 'react';
import * as S from './styled';
import EachCoupon from './EachCoupon/EachCoupon';

import { useLoadCoupon, useApplyCoupons, useDiscount } from '@hooks/coupon/index';

interface CouponProps {
  isolatedRegion: boolean;
}

const Coupon = ({ isolatedRegion }: CouponProps) => {
  const [couponModalOpen, toggleCouponModalOpen] = useReducer(prev => !prev, false);

  const notExpiredCoupon = useLoadCoupon();
  const { applyingCoupons, changeApplying, isSelected, isAlreadyApplyingMaximumCoupons } =
    useApplyCoupons();

  const { discountAmount, handleDiscountAmount } = useDiscount(applyingCoupons, isolatedRegion);

  const applyCouponAndCloseModal = () => {
    handleDiscountAmount(discountAmount);
    toggleCouponModalOpen();
  };

  return (
    <>
      <S.ApplyCouponButton onClick={toggleCouponModalOpen}>쿠폰 적용</S.ApplyCouponButton>
      <Modal type="dialog" open={couponModalOpen} onClose={toggleCouponModalOpen}>
        <Modal.Header title="쿠폰을 선택해 주세요" onClose={toggleCouponModalOpen} />
        <Modal.Content>
          {notExpiredCoupon.map(coupon => (
            <EachCoupon
              key={coupon.id}
              isSelect={isSelected(coupon)}
              coupon={coupon}
              isAlreadyApplyingMaximumCoupons={isAlreadyApplyingMaximumCoupons}
              changeApplying={changeApplying}
            />
          ))}
        </Modal.Content>
        <Modal.Footer
          closeButton={{ role: 'close', hide: true }}
          confirmButton={{
            customButton: (
              <S.ConfirmButton onClick={applyCouponAndCloseModal}>
                총 {`${discountAmount.toLocaleString()}`}원 할인 쿠폰 사용하기
              </S.ConfirmButton>
            ),
            role: 'confirm',
          }}
        />
      </Modal>
    </>
  );
};

export default Coupon;
