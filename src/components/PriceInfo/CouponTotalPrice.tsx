import { useCouponContext } from "../../hooks/useCouponContext";
import PriceInfo from "../PriceInfo/PriceInfo";

interface Props {
  totalPrice: number;
}

const CouponTotalPrice = ({ totalPrice }: Props) => {
  const { totalDiscount } = useCouponContext();
  return <PriceInfo label="총 결제 금액" price={totalPrice - totalDiscount} />;
};

export default CouponTotalPrice;
