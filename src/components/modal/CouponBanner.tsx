import infoImage from '@/asset/Info.png';
import styles from './couponBanner.module.css';

export default function CouponBanner() {
  return (
    <div className={styles.banner_container}>
      <img src={infoImage} width={16} height={16} alt="info-image" />
      <span className={styles.text}>쿠폰은 최대 2개까지 사용할 수 있습니다.</span>
    </div>
  );
}
