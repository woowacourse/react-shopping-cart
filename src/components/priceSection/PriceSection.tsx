import styled from '@emotion/styled';
import PriceRow from './PriceRow';

interface PriceSectionProps {
  orderPrice: number;
  discountPrice?: number;
  deliveryPrice: number;
}

const PriceSection = ({ orderPrice, discountPrice, deliveryPrice }: PriceSectionProps) => {
  return (
    <>
      <S.CalculationContainer>
        <PriceRow title="주문 금액" price={orderPrice} data-testid="orderPrice" />
        {discountPrice !== undefined && (
          <PriceRow title="쿠폰 할인 금액" price={-discountPrice} data-testid="discountPrice" />
        )}
        <PriceRow title="배송비" price={deliveryPrice} data-testid="deliveryPrice" />
      </S.CalculationContainer>

      <PriceRow
        title="총 결제 금액"
        price={orderPrice + deliveryPrice - (discountPrice ?? 0)}
        data-testid="totalPrice"
      />
    </>
  );
};

export default PriceSection;

const S = {
  CalculationContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 12px 0px;
    border-bottom: 2px solid #e6e6e6;
    margin-bottom: 12px;
  `,
};
