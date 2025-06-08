import {
  title,
  imgLayout,
  deliveryInfo,
  deliveryInfoBox,
  couponList,
  headLayout,
  closeButton,
  closeImgLayout,
} from './CouponModalContent.style';
import Button from '../../Common/Button/Button';
import { css } from '@emotion/react';
import { CouponItem } from '../CouponItem/CouponItem';
import { Coupon } from '../../../types/coupon';

interface CouponModalContentProps {
  onChange: (id: string) => void;
  selectedCouponIds: string[];
  handleUseClick: () => void;
  handleClose: () => void;
}

export function CouponModalContent({
  onChange,
  selectedCouponIds,
  handleUseClick,
  handleClose,
}: CouponModalContentProps) {
  const totalPrice = 6000;

  const DUMMY: Coupon[] = [
    {
      id: 1,
      code: 'FIXED5000',
      description: '5,000원 할인 쿠폰',
      expirationDate: '2025-11-30',
      discount: 5000,
      minimumAmount: 100000,
      discountType: 'fixed',
    },
    {
      id: 2,
      code: 'BOGO',
      description: '2개 구매 시 1개 무료 쿠폰',
      expirationDate: '2025-06-30',
      buyQuantity: 2,
      getQuantity: 1,
      discountType: 'buyXgetY',
    },
    {
      id: 3,
      code: 'FREESHIPPING',
      description: '5만원 이상 구매 시 무료 배송 쿠폰',
      expirationDate: '2025-08-31',
      minimumAmount: 50000,
      discountType: 'freeShipping',
    },
    {
      id: 4,
      code: 'MIRACLESALE',
      description: '미라클모닝 30% 할인 쿠폰',
      expirationDate: '2025-07-31',
      discount: 30,
      availableTime: {
        start: '04:00:00',
        end: '07:00:00',
      },
      discountType: 'percentage',
    },
  ];

  return (
    <>
      <div css={headLayout}>
        <p css={title}>쿠폰을 선택해 주세요</p>
        <button onClick={handleClose} css={closeButton}>
          <img css={closeImgLayout} src="./close.png" />
        </button>
      </div>
      <div css={deliveryInfoBox}>
        <img src="./info.png" css={imgLayout} />
        <p css={deliveryInfo}>쿠폰은 최대 2개까지 사용할 수 있습니다.</p>
      </div>
      <div css={couponList}>
        {DUMMY.map((couponData) => (
          <CouponItem
            couponData={couponData}
            onChange={onChange}
            isChecked={selectedCouponIds.includes(couponData.id.toString())}
          />
        ))}
      </div>
      <Button
        onClick={handleUseClick}
        size="full"
        customCss={css`
          background-color: #333333;
          font-size: 15px;
        `}
      >
        총 {totalPrice.toLocaleString('ko')}원 할인 쿠폰 사용하기
      </Button>
    </>
  );
}
