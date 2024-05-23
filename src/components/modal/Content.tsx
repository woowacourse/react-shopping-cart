import styles from './couponModal.module.css';
import CloseButton from './CloseButton';
import Heading from '@/components/common/Heading';
import common from '@/common.module.css';
import CouponItem from './CouponItem';
import CouponBanner from './CouponBanner';
import DiscountApplyButton from './DiscountApplyButton';
import { FormattedCoupon } from '@/types';

type Props = {
  handleModalClose: () => void;
  allCoupons: FormattedCoupon[];
};

export default function Content({ handleModalClose, allCoupons }: Props) {
  return (
    <div className={styles.content_container}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <Heading className={common.mainText} level={2}>
            쿠폰을 선택해 주세요
          </Heading>
          <CloseButton onClick={handleModalClose} />
        </div>
        <CouponBanner />

        <ul className={styles.coupon_list_container}>
          {allCoupons.map((coupon) => {
            return (
              <CouponItem
                key={coupon.id}
                id={coupon.id}
                description={coupon.description}
                minimumAmount={coupon.minimumAmount}
                availableTime={coupon?.availableTime}
                expirationDate={coupon.expirationDate}
                isAvailable={coupon.isAvailable}
              />
            );
          })}
        </ul>
        <DiscountApplyButton handleModalClose={handleModalClose} />
      </div>
    </div>
  );
}
