// import useCart from "../../hooks/useCart";
import useCartCalculations from "../../hooks/useCartCaculations";
import PriceInfo from "../PriceInfo/PriceInfo";
import * as S from "./PriceSummary.styles";

const PriceSummary = () => {
  const { orderPrice, shippingFee, totalPrice } = useCartCalculations();
  return (
    <S.PriceSummary>
      <S.PriceInfoWrapper>
        <PriceInfo label="주문 금액" price={orderPrice} />
        <PriceInfo label="배송비" price={shippingFee} />
      </S.PriceInfoWrapper>
      <S.PriceInfoWrapper>
        <PriceInfo label="총 결제 금액" price={totalPrice} />
      </S.PriceInfoWrapper>
    </S.PriceSummary>
  );
};

export default PriceSummary;
