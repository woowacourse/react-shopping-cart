import { useCouponContext } from "../../hooks/useCouponContext";
import PriceInfo from "../PriceInfo/PriceInfo";

const CouponDiscount = () => {
  const { totalDiscount } = useCouponContext();
  return <PriceInfo label="쿠폰 할인 금액" price={-totalDiscount} />;
};

export default CouponDiscount;
