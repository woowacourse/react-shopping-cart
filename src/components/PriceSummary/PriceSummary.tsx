import useCartCalculations from "../../hooks/useCartCalculations";
import CouponDiscount from "../PriceInfo/CouponDiscount";
import CouponTotalPrice from "../PriceInfo/CouponTotalPrice";
import PriceInfo from "../PriceInfo/PriceInfo";
import * as S from "./PriceSummary.styles";

interface PriceSummaryProps {
  showDiscount?: boolean;
}

const PriceSummary = ({ showDiscount = false }: PriceSummaryProps) => {
  const { orderPrice, shippingFee, totalPrice } = useCartCalculations();

  return (
    <S.PriceSummary>
      <S.PriceInfoWrapper>
        <PriceInfo label="주문 금액" price={orderPrice} />
        {showDiscount && <CouponDiscount />}
        <PriceInfo label="배송비" price={shippingFee} />
      </S.PriceInfoWrapper>
      <S.PriceInfoWrapper>
        {showDiscount ? (
          <CouponTotalPrice totalPrice={totalPrice} />
        ) : (
          <PriceInfo label="총 결제 금액" price={totalPrice} />
        )}
      </S.PriceInfoWrapper>
    </S.PriceSummary>
  );
};

export default PriceSummary;
