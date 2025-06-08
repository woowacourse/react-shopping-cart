import useCartCalculations from "../../hooks/useCartCalculations";
import { useCouponContext } from "../../hooks/useCouponContext";
import PriceInfo from "../PriceInfo/PriceInfo";
import * as S from "./PriceSummary.styles";

interface PriceSummaryProps {
  showDiscount?: boolean;
}

const PriceSummary = ({ showDiscount = false }: PriceSummaryProps) => {
  const { orderPrice, shippingFee, totalPrice } = useCartCalculations();

  const { totalDiscount } = useCouponContext();

  return (
    <S.PriceSummary>
      <S.PriceInfoWrapper>
        <PriceInfo label="주문 금액" price={orderPrice} />
        {showDiscount && (
          <PriceInfo label="쿠폰 할인 금액" price={-totalDiscount} />
        )}
        <PriceInfo label="배송비" price={shippingFee} />
      </S.PriceInfoWrapper>
      <S.PriceInfoWrapper>
        {showDiscount ? (
          <PriceInfo label="총 결제 금액" price={totalPrice - totalDiscount} />
        ) : (
          <PriceInfo label="총 결제 금액" price={totalPrice} />
        )}
      </S.PriceInfoWrapper>
    </S.PriceSummary>
  );
};

export default PriceSummary;
