import { Modal } from 'cookie-nice-modal';
import { useReducer } from 'react';
import * as S from './styled';
import EachCoupon from './EachCoupon/EachCoupon';
import { Coupon as CouponType } from '@type/coupon';

interface CouponProps {
  isolatedRegion: boolean;
  notExpiredCoupon: CouponType[];
  applyingCoupons: CouponType[];
  changeApplying: (coupon: CouponType) => void;
  isSelected: (coupon: CouponType) => boolean;
  isAlreadyApplyingMaximumCoupons: boolean;
  discountAmount: number;
  handleDiscountAmount: (discount: number) => void;
  handleCouponDetail: (coupons: CouponType[]) => void;
}

const Coupon = ({
  notExpiredCoupon,
  applyingCoupons,
  changeApplying,
  handleCouponDetail,
  isSelected,
  isAlreadyApplyingMaximumCoupons,
  discountAmount,
  handleDiscountAmount,
}: CouponProps) => {
  const [couponModalOpen, toggleCouponModalOpen] = useReducer(prev => !prev, false);

  const applyCouponAndCloseModal = () => {
    handleCouponDetail(applyingCoupons);
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
