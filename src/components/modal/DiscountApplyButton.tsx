import Button from '../common/Button';
import styles from './discountApplyButton.module.css';
import formatKoreanCurrency from '@/utils/formatKoreanCurrency';
import { useCouponManager } from '@/store/custom/useCouponManager';

type Props = {
  handleModalClose: () => void;
};

export default function DiscountApplyButton({ handleModalClose }: Props) {
  const { totalMaxDiscountPrice } = useCouponManager();

  return (
    <Button className={styles.button} type="button" onClick={handleModalClose}>
      총 {formatKoreanCurrency(totalMaxDiscountPrice)}원 할인 쿠폰 사용하기
    </Button>
  );
}
