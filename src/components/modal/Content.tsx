import styles from './couponModal.module.css';
import CloseButton from './CloseButton';
import Heading from '@/components/common/Heading';
import common from '@/common.module.css';
import { allCouponStates } from '@/store/atoms';
import { useRecoilValue } from 'recoil';
import CouponItem from './CouponItem';
import CouponBanner from './CouponBanner';

type Props = {
  handleModalClose: () => void;
};

export default function Content({ handleModalClose }: Props) {
  const allCoupons = useRecoilValue(allCouponStates);

  console.log(allCoupons);

  return (
    <div className={styles.content_container}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <Heading className={common.mainText} level={2}>
            쿠폰을 선택해 주세요
          </Heading>
          <CloseButton onClick={handleModalClose} role="button" tabIndex={0} />
        </div>
        <CouponBanner />

        <ul className={styles.coupon_list_container}>
          {allCoupons.map((coupon) => {
            return (
              <CouponItem
                id={coupon.id}
                code={coupon.code}
                description={coupon.description}
                discount={coupon?.discount}
                discountType={coupon.discountType}
                minimumAmount={coupon.minimumAmount}
                buyQuantity={coupon?.buyQuantity}
                getQuantity={coupon?.getQuantity}
                availableTime={coupon?.availableTime}
                expirationDate={coupon.expirationDate}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
}
