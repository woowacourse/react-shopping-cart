import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { discountAmountState, remoteShippingOptionState } from '../../../recoil/atoms';
import { Modal } from '@seongjinme/react-modal';

import { InfoBox } from '../../common';
import { CouponItem, OpenCouponModalButton } from '../';
import { useApplyCoupons, useCouponApplyButton, useCoupons } from '../../../hooks';

export default function CouponContainer() {
  const [isCouponModalOpened, setIsCouponModalOpened] = useState(false);
  const { coupons, calculateDiscountAmount } = useCoupons();
  const {
    isCheckedCoupon,
    checkedCouponIds,
    resetCheckedCouponIds,
    isReachedApplicableLimit,
    onCheckCoupon,
    updateAppliedCoupons,
  } = useApplyCoupons();

  const setDiscountAmount = useSetRecoilState(discountAmountState);
  const discountAmount = calculateDiscountAmount(checkedCouponIds);
  const isRemoteShipping = useRecoilValue(remoteShippingOptionState);

  useEffect(() => {
    setDiscountAmount(calculateDiscountAmount(checkedCouponIds));
  }, [setDiscountAmount, calculateDiscountAmount, checkedCouponIds, isRemoteShipping]);

  const couponModalTargetElement = document.getElementById('modal') as HTMLElement;

  const handleOpenCouponModal = () => {
    setIsCouponModalOpened(true);
  };

  const handleApplyCoupons = () => {
    updateAppliedCoupons();
    setDiscountAmount(discountAmount);
    setIsCouponModalOpened(false);
  };

  const handleCloseWithoutApplyCoupon = () => {
    resetCheckedCouponIds();
    setIsCouponModalOpened(false);
  };

  return (
    <>
      <OpenCouponModalButton type="button" buttonText="쿠폰 적용" onClick={handleOpenCouponModal} />

      {createPortal(
        <Modal
          isOpen={isCouponModalOpened}
          title="쿠폰을 선택해 주세요"
          width="382px"
          onClose={handleCloseWithoutApplyCoupon}
          buttons={[useCouponApplyButton({ discountAmount, onClick: handleApplyCoupons })]}
        >
          <InfoBox
            alt="쿠폰 적용 기준 메시지 아이콘"
            text="쿠폰은 최대 2개까지 사용할 수 있습니다."
            style={{ marginTop: '16px' }}
          />
          {coupons.map((coupon) => {
            return (
              <CouponItem
                key={coupon.id}
                coupon={coupon}
                isReachedApplicableLimit={isReachedApplicableLimit}
                isCheckedCoupon={isCheckedCoupon(coupon.id)}
                onCheck={onCheckCoupon}
              />
            );
          })}
        </Modal>,
        couponModalTargetElement,
      )}
    </>
  );
}
