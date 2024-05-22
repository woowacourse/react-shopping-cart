import { css } from '@emotion/react';
import { Modal } from 'maru-nice-modal';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';

import CouponItem from './CouponItem';

import GuideText from '@common/GuideText';
import { couponListState } from '@recoil/coupons/atoms';

interface CouponModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CouponModal = ({ isOpen, onClose }: CouponModalProps) => {
  const couponList = useRecoilValue(couponListState);
  const [discountTotal, setDiscountTotal] = useState(0);

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
          {couponList.map((coupon) => (
            <CouponItem key={coupon.id} coupon={coupon} type={coupon.discountType} />
          ))}
        </div>
      </Modal.Content>
      <Modal.ConfirmButton
        css={confirmButton}
        label={`총 ${discountTotal.toLocaleString('ko-KR')}원 할인 쿠폰 사용하기`}
        onConfirm={onClose}
      />
    </Modal>
  );
};

const contentWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export default CouponModal;

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
