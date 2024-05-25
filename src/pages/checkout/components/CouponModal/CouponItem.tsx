import CaptionText from '../../../../components/common/CaptionText/CaptionText';
import CheckBox from '../../../../components/common/CheckBox/CheckBox';
import Divider from '../../../../components/common/Divider/Divider';
import SubtitleText from '../../../../components/common/SubtitleText/SubtitleText';
import { CouponType } from '../../../../types';
import formatCouponCaption from '../../../../utils/formatCouponCaption';
import styles from './CouponModal.module.css';

interface Props {
  coupon: CouponType;
  isChecked: boolean;
  onChange: () => void;
}

export default function CouponItem({ coupon, isChecked, onChange }: Props) {
  return (
    <>
      <Divider />
      <div className={styles.couponItemContainer}>
        <div className={styles.couponItemTitleContainer}>
          <CheckBox id={coupon.code} checked={isChecked} onChange={onChange} />
          <SubtitleText>{coupon.description}</SubtitleText>
        </div>
        <div className={styles.couponItemCaptionContainer}>
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
