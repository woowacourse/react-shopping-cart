import WideButton from '../Button/WideButton';
import { selectedCouponListState } from '@/store/atoms';
import { useRecoilValue } from 'recoil';
import useTotalCouponDiscount from '@/hooks/useTotalCouponDiscount';

interface Props {
  onClick: () => void;
}

const CouponConfirmButton = ({ onClick }: Props) => {
  const selectedCoupon = useRecoilValue(selectedCouponListState);
  const date = new Date();
  const totalDiscountPrice = useTotalCouponDiscount({
    coupons: selectedCoupon || [],
    date,
  });

  return (
    // TODO: 금액 포맷팅하기
    <WideButton onClick={onClick} color="black">
      {`총 ${totalDiscountPrice}원 할인 쿠폰 사용하기`}
    </WideButton>
  );
};

export default CouponConfirmButton;
