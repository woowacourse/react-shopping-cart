import { useRecoilValue } from 'recoil';
import CaptionText from '../../../../components/common/CaptionText/CaptionText';
import CheckBox from '../../../../components/common/CheckBox/CheckBox';
import Divider from '../../../../components/common/Divider/Divider';
import SubtitleText from '../../../../components/common/SubtitleText/SubtitleText';
import { CouponType } from '../../../../types';
import formatCouponCaption from '../../../../utils/formatCouponCaption';
import styles from './CouponModal.module.css';
import { activeCouponsState } from '../../../../store/atoms';

interface Props {
  coupon: CouponType;
  isChecked: boolean;
  isFulledActiveCoupons: boolean;
  onChange: () => void;
}

export default function CouponItem({ coupon, isChecked, isFulledActiveCoupons, onChange }: Props) {
  const activeCoupons = useRecoilValue(activeCouponsState);
  const isIncludeActiveCoupon = activeCoupons.map((coupon) => coupon.code).includes(coupon.code);
  const isActiveCoupon = isFulledActiveCoupons && !isIncludeActiveCoupon;
  const disabledStyle = isActiveCoupon ? 'disabledStyle' : '';
  return (
    <>
      <Divider />
      <div className={styles.couponItemContainer}>
        <div className={`${styles.couponItemTitleContainer} ${styles[disabledStyle]}`}>
          <CheckBox
            id={coupon.code}
            checked={isChecked}
            disabled={isActiveCoupon}
            onChange={onChange}
          />
          <SubtitleText>{coupon.description}</SubtitleText>
        </div>
        <div className={`${styles.couponItemCaptionContainer} ${styles[disabledStyle]}`}>
          {coupon.expirationDate && (
            <CaptionText>
              {formatCouponCaption.formatCouponExpirationDate(coupon.expirationDate)}
            </CaptionText>
          )}
          {coupon.minimumAmount && (
            <CaptionText>
              {formatCouponCaption.formatCouponMinimumAmount(coupon.minimumAmount)}
            </CaptionText>
          )}
          {coupon.availableTime && (
            <CaptionText>
              {formatCouponCaption.formatCouponAvailableTime(coupon.availableTime)}
            </CaptionText>
          )}
        </div>
      </div>
    </>
  );
}
