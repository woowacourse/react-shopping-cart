import styled from '@emotion/styled';
import { useCartItemsContext } from '../../contexts/CartItems/CartItemsContext';
import getOrderPrice from '../../utils/getOrderPrice';
import PriceRow from './PriceRow';
import { useCheckCartIdsContext } from '../../contexts/CheckedCartIds/CheckedCartIdsContext';
import calculateDeliveryPrice from '../../utils/calculateDeliveryPrice';
import { useCouponsContext } from '../../contexts/Coupons/CouponsContext';

const PriceSection = () => {
  const { cartItems } = useCartItemsContext();
  const { checkedCartIds } = useCheckCartIdsContext();
  const { couponDiscount } = useCouponsContext();
  console.log(couponDiscount);

  const orderPrice = getOrderPrice(cartItems, checkedCartIds);

  const deliveryPrice = calculateDeliveryPrice(orderPrice);

  return (
    <>
      <S.calculationContainer>
        <PriceRow
          title="주문 금액"
          price={orderPrice}
          data-testid="orderPrice"
        />
        {couponDiscount > 0 && (
          <PriceRow
            title="쿠폰 할인 금액"
            price={-couponDiscount}
            data-testid="couponDiscount"
          />
        )}
        <PriceRow
          title="배송비"
          price={deliveryPrice}
          data-testid="deliveryPrice"
        />
      </S.calculationContainer>

      <PriceRow
        title="총 결제 금액"
        price={orderPrice + deliveryPrice - couponDiscount}
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
