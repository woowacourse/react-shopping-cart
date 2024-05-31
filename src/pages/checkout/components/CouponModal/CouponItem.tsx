import CheckBox from '@components/common/CheckBox/CheckBox';
import Divider from '@components/common/Divider/Divider';
import Text from '@components/common/Text/Text';
import formatCouponCaption from '@utils/formatCouponCaption';
import { CouponType } from '../../../../types';
import styles from './CouponModal.module.css';

interface Props {
  coupon: CouponType;
  isChecked: boolean;
  isDisableCoupon: boolean;
  onChange: () => void;
}

export default function CouponItem({ coupon, isChecked, isDisableCoupon, onChange }: Props) {
  const disabledStyle = isDisableCoupon ? 'disabledStyle' : '';
  return (
    <>
      <Divider />
      <div className={styles.couponItemContainer}>
        <div className={`${styles.couponItemTitleContainer} ${styles[disabledStyle]}`}>
          <CheckBox
            id={coupon.code}
            checked={isChecked}
            disabled={isDisableCoupon}
            onChange={onChange}
          />
          <Text.Subtitle>{coupon.description}</Text.Subtitle>
        </div>
        <div className={`${styles.couponItemCaptionContainer} ${styles[disabledStyle]}`}>
          {coupon.expirationDate && (
            <Text.Caption>
              {formatCouponCaption.formatCouponExpirationDate(coupon.expirationDate)}
            </Text.Caption>
          )}
          {coupon.minimumAmount && (
            <Text.Caption>
              {formatCouponCaption.formatCouponMinimumAmount(coupon.minimumAmount)}
            </Text.Caption>
          )}
          {coupon.availableTime && (
            <Text.Caption>
              {formatCouponCaption.formatCouponAvailableTime(coupon.availableTime)}
            </Text.Caption>
          )}
        </div>
      </div>
    </>
  );
}
