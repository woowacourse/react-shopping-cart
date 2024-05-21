import Button from '../common/Button';
import styles from './discountApplyButton.module.css';

export default function DiscountApplyButton() {
  return (
    <Button className={styles.button} type="button">
      총 6,000원 할인 쿠폰 사용하기
    </Button>
  );
}
