import styled from '@emotion/styled';
import { useCartItemsContext } from '../../contexts/CartItemsContext';
import getOrderPrice from '../../utils/getOrderPrice';
import PriceRow from './PriceRow';

const PriceSection = () => {
  const { cartItems, checkedCartIds } = useCartItemsContext();
  const orderPrice = getOrderPrice(cartItems, checkedCartIds);

  const deliveryPrice = orderPrice >= 100000 || orderPrice === 0 ? 0 : 3000;

  return (
    <>
      <S.calculationContainer>
        <PriceRow
          title="주문 금액"
          price={orderPrice}
          data-testid="orderPrice"
        />
        <PriceRow
          title="배송비"
          price={deliveryPrice}
          data-testid="deliveryPrice"
        />
      </S.calculationContainer>

      <PriceRow
        title="총 결제 금액"
        price={orderPrice + deliveryPrice}
        data-testid="totalPrice"
      />
    </>
  );
};

export default PriceSection;

const S = {
  calculationContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 12px 0px;
    border-bottom: 2px solid #e6e6e6;
    margin-bottom: 12px;
  `,
};
