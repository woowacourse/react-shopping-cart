import { css } from '@emotion/react';
import { Modal } from 'maru-nice-modal';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';

import CouponItem from './CouponItem';
import { couponValidator } from './couponValidator';

import { couponSavedCheckListState } from '@/recoil/coupons/atoms';
import GuideText from '@common/GuideText';

import useCoupon from '@hooks/useCoupon';

interface CouponModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CouponModal = ({ isOpen, onClose }: CouponModalProps) => {
  const { couponList, couponCheckList, handleChangeChecked, isValidCouponCount } = useCoupon();
  const { isCouponValid } = couponValidator();
  const setCouponSavedCheckList = useSetRecoilState(couponSavedCheckListState);

  const [discountTotal, setDiscountTotal] = useState(0);

  const handleClickApplyCoupon = () => {
    setCouponSavedCheckList(couponCheckList);
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
              key={coupon.id}
              coupon={coupon}
              type={coupon.discountType}
              isCouponValid={
                isValidCouponCount ? isCouponValid(coupon) : couponCheckList[idx].isChecked
              }
              isChecked={couponCheckList[idx].isChecked}
              handleChangeChecked={handleChangeChecked}
            />
          ))}
        </div>
      </Modal.Content>
      <Modal.ConfirmButton
        css={confirmButton}
        label={`총 ${discountTotal.toLocaleString('ko-KR')}원 할인 쿠폰 사용하기`}
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
