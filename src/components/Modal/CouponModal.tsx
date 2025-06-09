import { useMemo } from 'react';
import { CartItemType } from '../../types/cartItem';
import { Coupon } from '../../types/coupon';
import Button from '../common/Button';
import CouponItem from './CouponItem';
import Modal from './Modal';
import { calculateCouponDiscount } from './utils/calculateCouponDiscount';
import { css } from '@emotion/react';
import { MAX_COUPON_LENGTH } from '../../constants/maxCouponLength';

interface CouponModalProps {
  isOpen: boolean;
  handleClose: () => void;
  coupons: Coupon[];
  orderAmount: number;
  checkedItems: CartItemType[];
  totalDeliveryFee: number;
  temp: Coupon[];
  toggleCoupon: (coupon: Coupon) => void;
  apply: () => void;
}

const CouponModal = ({
  isOpen,
  handleClose,
  coupons,
  orderAmount,
  checkedItems,
  totalDeliveryFee,
  temp,
  toggleCoupon,
  apply
}: CouponModalProps) => {
  const tempTotalDiscount = useMemo(
    () => temp.reduce((sum, c) => sum + calculateCouponDiscount(c, orderAmount, checkedItems, totalDeliveryFee), 0),
    [temp, orderAmount, checkedItems, totalDeliveryFee]
  );

  return (
    <Modal isOpen={isOpen} handleClose={handleClose}>
      <div css={infoCss}>
        <img src="./assets/info.svg" alt="info icon" />
        <p css={fontSize12}>쿠폰은 최대 {MAX_COUPON_LENGTH}개까지 사용할 수 있습니다.</p>
      </div>
      {coupons?.map((coupon) => (
        <CouponItem
          key={coupon.id}
          coupon={coupon}
          orderAmount={orderAmount}
          items={checkedItems}
          selectedCoupons={temp}
          handleCouponToggle={() => toggleCoupon(coupon)}
        />
      ))}
      <Button css={buttonCss} onClick={apply}>
        총 {tempTotalDiscount.toLocaleString()}원 할인쿠폰 사용하기
      </Button>
    </Modal>
  );
};

export default CouponModal;

const buttonCss = css({
  all: 'unset',
  borderRadius: '5px',
  backgroundColor: '#333333',
  textAlign: 'center',
  width: '100%',
  cursor: 'pointer',
  border: 'none',
  minHeight: '44px',
  color: 'white',
  fontSize: '15px',
  fontWeight: 'bold'
});

const infoCss = css({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  width: '100%',
  marginBottom: '16px'
});

const fontSize12 = css({
  fontSize: '12px'
});
