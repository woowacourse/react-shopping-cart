import Button from '../common/Button';
import styles from './discountApplyButton.module.css';
import { totalDiscountPriceSelector } from '@/store/couponSelector';
import { useRecoilValue } from 'recoil';
import formatKoreanCurrency from '@/utils/formatKoreanCurrency';

type Props = {
  handleModalClose: () => void;
};

export default function DiscountApplyButton({ handleModalClose }: Props) {
  const totalDiscountPrice = useRecoilValue(totalDiscountPriceSelector);

  return (
    <Button className={styles.button} type="button" onClick={handleModalClose}>
      총 {formatKoreanCurrency(totalDiscountPrice)}원 할인 쿠폰 사용하기
    </Button>
  );
}
