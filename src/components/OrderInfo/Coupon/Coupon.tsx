import { Modal } from 'cookie-nice-modal';
import { useReducer } from 'react';
import { useSetRecoilState } from 'recoil';
import * as S from './styled';
import EachCoupon from './EachCoupon/EachCoupon';
import { Coupon as CouponType } from '@type/coupon';

import { useLoadCoupon, useApplyCoupons, useDiscount } from '@hooks/coupon/index';
import { discountAmountStore } from '@recoil/atoms';

const Coupon = () => {
  const [couponModalOpen, toggleCouponModalOpen] = useReducer(prev => !prev, false);
  const notExpiredCoupon = useLoadCoupon();

  const { applyingCoupons, changeApplying, isAlreadyApplyingMaximumCoupons } = useApplyCoupons();
  const { discountAmount } = useDiscount();

  const setDiscountAmountStore = useSetRecoilState(discountAmountStore);

  const isSelected = (coupon: CouponType) => {
    return applyingCoupons.find(applying => applying.id === coupon.id) !== undefined;
  };

  const applyCouponAndCloseModal = () => {
    setDiscountAmountStore(discountAmount);
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
