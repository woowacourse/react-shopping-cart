import { useCoupons } from './';
import { ButtonInterface } from '@seongjinme/react-modal';

interface UseCouponApplyButtonProps {
  discountAmount: number;
  onClick: () => void;
}

export default function useCouponApplyButton({
  discountAmount,
  onClick,
}: UseCouponApplyButtonProps): ButtonInterface {
  const { hasUsableCoupon } = useCoupons();

  const getButtontext = () => {
    if (!hasUsableCoupon) {
      return `적용 가능한 할인 쿠폰이 없습니다 🥺`;
    }

    if (discountAmount === 0) {
      return `할인 쿠폰 적용 없이 주문하기 🤔`;
    }

    return `총 ${discountAmount.toLocaleString('ko-KR')}원 할인 쿠폰 사용하기 🤗`;
  };

  return {
    text: getButtontext(),
    style: 'primary',
    disabled: !hasUsableCoupon,
    onClick,
  };
}
