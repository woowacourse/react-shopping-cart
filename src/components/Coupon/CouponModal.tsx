import { css } from '@emotion/react';
import { Modal } from 'maru-nice-modal';

import CouponItem from './CouponItem';
import GuideText from '../common/GuideText';

import { Coupon } from '@/types/coupon';

interface CouponModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const coupons: Coupon[] = [
  {
    id: 1,
    code: 'FIXED5000',
    description: '5,000원 할인 쿠폰',
    expirationDate: '2024-11-30',
    discount: 5000,
    minimumAmount: 100000,
    discountType: 'fixed',
  },
  {
    id: 2,
    code: 'BOGO',
    description: '2개 구매 시 1개 무료 쿠폰',
    expirationDate: '2024-04-30',
    buyQuantity: 2,
    getQuantity: 1,
    discountType: 'buyXgetY',
  },
  {
    id: 3,
    code: 'FREESHIPPING',
    description: '5만원 이상 구매 시 무료 배송 쿠폰',
    expirationDate: '2024-08-31',
    minimumAmount: 50000,
    discountType: 'freeShipping',
  },
  {
    id: 4,
    code: 'MIRACLESALE',
    description: '미라클모닝 30% 할인 쿠폰',
    expirationDate: '2024-07-31',
    discount: 30,
    availableTime: {
      start: '04:00:00',
      end: '07:00:00',
    },
    discountType: 'percentage',
  },
];

const CouponModal = ({ isOpen, onClose }: CouponModalProps) => {
  const discountTotal = 0;

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
          {coupons.map((coupon) => (
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
