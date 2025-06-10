import { CartItemType } from '../../types/cartItem';
import { Coupon } from '../../types/coupon';
import Button from '../common/Button';
import CouponItem from './CouponItem';
import Modal from './Modal';
import { css } from '@emotion/react';
import { MAX_COUPON_LENGTH } from '../../constants/maxCouponLength';
import { useTotalDiscount } from '../../hooks/useTotalDiscount';
import { isCouponEnabled } from './utils/isCouponEnabled';

interface CouponModalProps {
  isOpen: boolean;
  handleClose: () => void;
  coupons: Coupon[];
  orderAmount: number;
  checkedItems: CartItemType[];
  totalDeliveryFee: number;
  draftCoupons: Coupon[];
  toggleCoupon: (coupon: Coupon) => void;
  apply: () => void;
}

const CouponModal = ({
  isOpen,
  handleClose,
  coupons,
  orderAmount,
  checkedItems,
  draftCoupons,
  toggleCoupon,
  apply
}: CouponModalProps) => {
  const tempTotalDiscount = useTotalDiscount(draftCoupons, orderAmount, checkedItems);

  return (
    <Modal isOpen={isOpen} handleClose={handleClose}>
      <div css={infoCss}>
        <img src="./assets/info.svg" alt="info icon" />
        <p css={fontSize12}>쿠폰은 최대 {MAX_COUPON_LENGTH}개까지 사용할 수 있습니다.</p>
      </div>
      {coupons?.map((coupon) => {
        const isChecked = draftCoupons.includes(coupon);
        const isEnabled =
          (isCouponEnabled({ coupon, orderAmount, items: checkedItems }) && draftCoupons.length < MAX_COUPON_LENGTH) ||
          isChecked;
        return (
          <CouponItem
            key={coupon.id}
            coupon={coupon}
            isEnabled={isEnabled}
            isChecked={isChecked}
            handleCouponToggle={() => toggleCoupon(coupon)}
          />
        );
      })}
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
