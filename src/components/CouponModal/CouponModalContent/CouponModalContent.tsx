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
  handleUseClick: () => void;
  handleClose: () => void;
  handleCouponIdsChange: (id: string) => void;
  coupons: Coupon[];
  selectedCouponIds: string[];
  couponPrice: number;
  couponWithDisabled: boolean[];
}

export function CouponModalContent({
  handleUseClick,
  handleClose,
  handleCouponIdsChange,
  coupons,
  selectedCouponIds,
  couponPrice,
  couponWithDisabled,
}: CouponModalContentProps) {
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
        {coupons.map((coupon, index) => (
          <CouponItem
            disabled={couponWithDisabled[index]}
            couponData={coupon}
            onChange={handleCouponIdsChange}
            isChecked={selectedCouponIds.includes(coupon.id.toString())}
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
        총 {couponPrice.toLocaleString('ko')}원 할인 쿠폰 사용하기
      </Button>
    </>
  );
}
