import styled from '@emotion/styled';
import { useCartItemsContext } from '../../contexts/CartItemsContext';
import PriceRow from './PriceRow';
import { DELIVERY_PRICE, DELIVERY_PRICE_THRESHOLD } from '../../constants/config';
import { getOrderPrice } from '../../utils';

const PriceSection = () => {
  const { cartItems, checkedCartIds } = useCartItemsContext();
  const orderPrice = getOrderPrice(cartItems, checkedCartIds);

  const deliveryPrice =
    orderPrice >= DELIVERY_PRICE_THRESHOLD || orderPrice === 0 ? 0 : DELIVERY_PRICE;

  return (
    <>
      <S.CalculationContainer>
        <PriceRow title="주문 금액" price={orderPrice} data-testid="orderPrice" />
        <PriceRow title="배송비" price={deliveryPrice} data-testid="deliveryPrice" />
      </S.CalculationContainer>

      <PriceRow title="총 결제 금액" price={orderPrice + deliveryPrice} data-testid="totalPrice" />
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
