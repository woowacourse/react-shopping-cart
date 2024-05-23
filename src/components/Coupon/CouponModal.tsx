import { css } from '@emotion/react';
import { Modal } from 'maru-nice-modal';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import CouponItem from './CouponItem';

import { useCouponApplicabilityChecker } from '@/hooks/useCouponApplicabilityChecker';
import { orderResultState } from '@/recoil/cartItems/selectors';
import { couponSavedCheckListState, totalDiscountPriceState } from '@/recoil/coupons/atoms';
import GuideText from '@common/GuideText';

import useCoupon from '@hooks/useCoupon';

interface CouponModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CouponModal = ({ isOpen, onClose }: CouponModalProps) => {
  const {
    couponList,
    couponCheckList,
    handleChangeChecked,
    isValidCouponCount,
    localDiscountPrice,
  } = useCoupon();
  const { isCouponApplicable } = useCouponApplicabilityChecker();

  const { totalOrderPrice } = useRecoilValue(orderResultState);
  const setCouponSavedCheckList = useSetRecoilState(couponSavedCheckListState);
  const setTotalDiscountPrice = useSetRecoilState(totalDiscountPriceState);

  const isFreeShipping = couponCheckList.find(
    (coupon) => coupon.code === 'FREESHIPPING',
  )?.isChecked;
  const displayDiscountLabel = `총 ${localDiscountPrice.toLocaleString('ko-KR')}원 할인 쿠폰 사용하기`;

  const handleClickApplyCoupon = () => {
    setCouponSavedCheckList(couponCheckList);
    setTotalDiscountPrice(localDiscountPrice);
    onClose();
  };

  return (
    <Modal isOpen={isOpen}>
      <Modal.Dimmed onDimmedClick={onClose} />
      <Modal.Header>
        <Modal.Title title="쿠폰을 선택해주세요" />
        <Modal.CloseIcon onClose={onClose} />
      </Modal.Header>
      <Modal.Content css={contentWrapper}>
        <GuideText label="쿠폰은 최대 2개까지 사용할 수 있습니다." />
        <div css={couponListWrapper}>
          {couponList.map((coupon, idx) => (
            <CouponItem
              key={coupon.code}
              coupon={coupon}
              type={coupon.discountType}
              isCouponValid={
                isValidCouponCount
                  ? isCouponApplicable(coupon, totalOrderPrice)
                  : couponCheckList[idx].isChecked
              }
              isChecked={couponCheckList[idx].isChecked}
              handleChangeChecked={(e) => handleChangeChecked(e, coupon)}
            />
          ))}
        </div>
      </Modal.Content>
      <Modal.ConfirmButton
        css={confirmButton}
        label={isFreeShipping ? `${displayDiscountLabel} + 무료 배송` : `${displayDiscountLabel}`}
        onConfirm={handleClickApplyCoupon}
      />
    </Modal>
  );
};

export default CouponModal;

const contentWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 10px;

  margin-bottom: 16px;
`;

const couponListWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const confirmButton = css`
  width: 100%;
  height: 44px;

  border-radius: 5px;
  background-color: #333333;

  font-weight: 700;
  color: white;
`;
