import { useCoupons } from "../../hooks/coupons";
import formatPriceToKoreanWon from "../../util/formatPriceToKoreanWon";
import BorderButton from "../common/BorderButton";

const ApplyCouponButton = () => {
  const { totalDiscountAmount } = useCoupons();

  return (
    <BorderButton size="full" bgColor="#000000" color="#ffffff">
      {formatPriceToKoreanWon(totalDiscountAmount)} 할인 적용
    </BorderButton>
  );
};

export default ApplyCouponButton;
